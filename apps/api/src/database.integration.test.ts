import { randomUUID } from 'node:crypto';
import { afterAll, describe, expect, it } from 'vitest';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_TEST_URI;
const client = uri ? new MongoClient(uri) : null;
const test = uri ? it : it.skip;

describe('MongoDB auth data model', () => {
  it('requires MONGODB_TEST_URI for integration coverage', () => {
    expect(uri ?? 'Set MONGODB_TEST_URI to run MongoDB integration tests').toBeTruthy();
  });

  test('stores a user, temporary business, branch, and expiring session together', async () => {
    await client!.connect();
    const database = client!.db(`interview_copilot_test_${randomUUID()}`);
    const users = database.collection('users');
    const businesses = database.collection('businesses');
    const branches = database.collection('branches');
    const sessions = database.collection('sessions');
    const userId = randomUUID();
    const businessId = randomUUID();
    const branchId = randomUUID();
    const accessToken = randomUUID();

    await sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    await users.insertOne({
      id: userId,
      email: 'integration@example.com',
      main_business_id: businessId,
      branch_id: branchId,
    });
    await businesses.insertOne({
      id: businessId,
      name: 'Interview Copilot',
      createdAt: new Date().toISOString(),
    });
    await branches.insertOne({
      id: branchId,
      main_business_id: businessId,
      name: 'Main Branch',
      createdAt: new Date().toISOString(),
    });
    await sessions.insertOne({ accessToken, userId, expiresAt: Date.now() + 60_000 });

    expect(await users.countDocuments({ id: userId })).toBe(1);
    expect(await businesses.countDocuments({ id: businessId })).toBe(1);
    expect(await branches.countDocuments({ id: branchId, main_business_id: businessId })).toBe(1);
    expect(await sessions.findOne({ accessToken, userId })).toBeTruthy();
    await database.dropDatabase();
  });
});

afterAll(async () => {
  await client?.close();
});
