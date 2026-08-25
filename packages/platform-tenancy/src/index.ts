import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { User } from '@company/auth-contracts';

export type TenantContext = {
  userId: string;
  main_business_id: string;
  branch_id: string;
};

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null;
    tenant: TenantContext | null;
    requireTenant: () => Promise<void>;
  }
}

const forbidden = (message: string): Error & { statusCode: number } =>
  Object.assign(new Error(message), { statusCode: 403 });

export const tenantContextFromUser = (user: User): TenantContext => ({
  userId: user.id,
  main_business_id: user.main_business_id,
  branch_id: user.branch_id,
});

export const tenantFilter = (tenant: TenantContext) => ({
  main_business_id: tenant.main_business_id,
  branch_id: tenant.branch_id,
});

type TenantPluginOptions = {
  authenticate: (request: FastifyRequest) => Promise<void>;
};

const tenantPlugin: FastifyPluginAsync<TenantPluginOptions> = async (app, options) => {
  app.decorateRequest('tenant', null);
  app.decorateRequest('requireTenant', async function requireTenant(this: FastifyRequest) {
    await options.authenticate(this);
    if (!this.user) throw forbidden('A tenant user is required.');

    const requestedBusiness = this.headers['x-main-business-id'];
    const requestedBranch = this.headers['x-branch-id'];
    const tenant = tenantContextFromUser(this.user);

    if (
      (requestedBusiness && requestedBusiness !== tenant.main_business_id) ||
      (requestedBranch && requestedBranch !== tenant.branch_id)
    ) {
      throw forbidden('The requested tenant scope is not available to this user.');
    }

    this.tenant = tenant;
  });
};

export const tenancyFastify = fp(tenantPlugin, { name: '@company/platform-tenancy' });

export const requireTenant = async (request: FastifyRequest): Promise<TenantContext> => {
  if (!request.tenant) throw forbidden('Tenant context has not been initialized.');
  return request.tenant;
};
