import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import modules from './modules';
import plugins from './lib/plugins';
import { initAuthentication } from './lib/authentication';
dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.SERVER_PORT || 8000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  await server.register(plugins);
  initAuthentication(server);
  await server.register(modules);
  return server;
};

const serverStart = async () => {
  try {
    const server = await init();
    await server.start();
    console.log(`server running on ${server.info.uri}`);
  } catch (error) {
    console.log(error.message);
  }
};

serverStart();
