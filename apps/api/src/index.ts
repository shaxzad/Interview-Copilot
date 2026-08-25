import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { Collection, MongoClient } from 'mongodb';
import { AuthSession, SignInSchema, SignUpSchema, User } from '@company/auth-contracts';

dotenv.config({ path: new URL('../../../.env', import.meta.url) });

const scrypt = promisify(scryptCallback);
type UserRecord = User & { passwordHash: string };
type BusinessRecord = { id: string; name: string; slug: string; createdAt: string };
type BranchRecord = { id: string; main_business_id: string; name: string; createdAt: string };
type SessionRecord = { accessToken: string; userId: string; expiresAt: number };

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

const mongoClient = new MongoClient(process.env.MONGODB_URI ?? 'mongodb://localhost:27017');
await mongoClient.connect();
const database = mongoClient.db(process.env.MONGODB_DATABASE ?? 'interview_copilot');
const users: Collection<UserRecord> = database.collection('users');
const businesses: Collection<BusinessRecord> = database.collection('businesses');
const branches: Collection<BranchRecord> = database.collection('branches');
const sessions: Collection<SessionRecord> = database.collection('sessions');

await Promise.all([
  users.createIndex({ email: 1 }, { unique: true }),
  sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  branches.createIndex({ main_business_id: 1 }),
]);

const hashPassword = async (password: string, salt = randomBytes(16).toString('hex')) => {
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
};

const verifyPassword = async (password: string, storedHash: string) => {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) return false;
  const expected = Buffer.from(key, 'hex');
  const actual = (await scrypt(password, salt, expected.length)) as Buffer;
  return expected.length === actual.length && timingSafeEqual(expected, actual);
};

const publicUser = (record: UserRecord): User => {
  const { passwordHash: _passwordHash, _id: _mongoId, ...user } = record as UserRecord & { _id?: unknown };
  return user;
};

const createSession = async (user: User): Promise<AuthSession> => {
  const accessToken = randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 60 * 60 * 1000;
  await sessions.insertOne({ accessToken, userId: user.id, expiresAt });
  return { accessToken, expiresAt, user };
};

const getAuthenticatedUser = async (authorization?: string) => {
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return null;
  const session = await sessions.findOne({ accessToken: token, expiresAt: { $gt: Date.now() } });
  if (!session) return null;
  const user = await users.findOne({ id: session.userId });
  return user ? publicUser(user) : null;
};

app.get('/health', async () => ({ status: 'ok', timestamp: new Date() }));
app.get('/api/v1', async () => ({ message: 'Interview Copilot API v1', version: '0.1.0' }));

app.post('/api/v1/auth/sign-up', async (request, reply) => {
  const input = SignUpSchema.parse(request.body);
  const email = input.email.toLowerCase();
  const now = new Date().toISOString();
  const main_business_id = randomUUID();
  const branch_id = randomUUID();
  const user: User = { id: randomUUID(), email, name: input.name, main_business_id, branch_id, createdAt: now, updatedAt: now };
  const slugBase = input.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  try {
    await businesses.insertOne({ id: main_business_id, name: input.businessName, slug: `${slugBase}-${main_business_id.slice(0, 8)}`, createdAt: now });
    await branches.insertOne({ id: branch_id, main_business_id, name: 'Main Branch', createdAt: now });
    await users.insertOne({ ...user, passwordHash: await hashPassword(input.password) });
  } catch (error) {
    await Promise.all([
      businesses.deleteOne({ id: main_business_id }),
      branches.deleteOne({ id: branch_id }),
      users.deleteOne({ id: user.id }),
    ]);
    if ((error as { code?: number }).code === 11000) return reply.code(409).send({ message: 'An account with this email already exists.' });
    throw error;
  }

  return reply.code(201).send(await createSession(user));
});

app.post('/api/v1/auth/sign-in', async (request, reply) => {
  const input = SignInSchema.parse(request.body);
  const record = await users.findOne({ email: input.email.toLowerCase() });
  if (!record || !(await verifyPassword(input.password, record.passwordHash))) return reply.code(401).send({ message: 'Email or password is incorrect.' });
  return reply.send(await createSession(publicUser(record)));
});

app.get('/api/v1/auth/session', async (request, reply) => {
  const user = await getAuthenticatedUser(request.headers.authorization);
  if (!user) return reply.code(401).send({ message: 'Session expired.' });
  return reply.send(await createSession(user));
});

app.post('/api/v1/auth/logout', async (request, reply) => {
  const token = request.headers.authorization?.replace(/^Bearer /, '');
  if (token) await sessions.deleteOne({ accessToken: token });
  return reply.code(204).send();
});

app.get('/api/v1/users/me', async (request, reply) => {
  const user = await getAuthenticatedUser(request.headers.authorization);
  if (!user) return reply.code(401).send({ message: 'Authentication required.' });
  return reply.send(user);
});

app.get('/api/v1/organizations', async (request, reply) => {
  const user = await getAuthenticatedUser(request.headers.authorization);
  if (!user) return reply.code(401).send({ message: 'Authentication required.' });
  const business = await businesses.findOne({ id: user.main_business_id });
  const branch = await branches.findOne({ id: user.branch_id });
  return reply.send(business && branch ? [{ id: business.id, name: business.name, slug: business.slug, role: 'owner', main_business_id: business.id, branch_id: branch.id }] : []);
});

const start = async () => {
  try {
    await app.listen({ port: Number.parseInt(process.env.API_PORT ?? '3000', 10), host: process.env.API_HOST ?? 'localhost' });
    console.log('Server running at http://localhost:3000');
  } catch (error) {
    app.log.error(error);
    await mongoClient.close();
    process.exit(1);
  }
};

void start();
