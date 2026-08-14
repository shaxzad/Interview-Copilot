import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

// Health check endpoint
app.get('/health', async (_request, _reply) => {
  return {
    status: 'ok',
    timestamp: new Date(),
  };
});

// Basic route
app.get('/api/v1', async (_request, _reply) => {
  return {
    message: 'Interview Copilot API v1',
    version: '0.1.0',
  };
});

const start = async () => {
  try {
    const port = parseInt(process.env.API_PORT || '3000', 10);
    const host = process.env.API_HOST || 'localhost';

    await app.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
