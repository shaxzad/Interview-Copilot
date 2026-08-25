import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { User } from '@company/auth-contracts';

export type VerifyAccessToken = (token: string) => Promise<User>;

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null;
    authenticate: () => Promise<void>;
  }
}

type AuthFastifyOptions = {
  verifyAccessToken: VerifyAccessToken;
};

const unauthorized = (message: string): Error & { statusCode: number } =>
  Object.assign(new Error(message), { statusCode: 401 });

const authPlugin: FastifyPluginAsync<AuthFastifyOptions> = async (app, options) => {
  app.decorateRequest('user', null);
  app.decorateRequest('authenticate', async function authenticate(this: FastifyRequest) {
    const header = this.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      throw unauthorized('Authentication required.');
    }

    try {
      this.user = await options.verifyAccessToken(token);
    } catch {
      throw unauthorized('Invalid or expired access token.');
    }
  });
};

export const authFastify = fp(authPlugin, {
  name: '@company/auth-fastify',
});

export const requireUser = async (request: FastifyRequest): Promise<void> => {
  await request.authenticate();
};
