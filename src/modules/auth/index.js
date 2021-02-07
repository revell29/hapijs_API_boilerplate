import AuthHandler from './AuthHandler';

const register = {
  name: 'auth-handler',
  version: '1.0.0',
  register: async function (server, options) {
    server.route([
      {
        path: '/auth/register',
        method: 'POST',
        handler: AuthHandler.register,
      },
      {
        path: '/auth/login',
        method: 'POST',
        handler: AuthHandler.login,
      },
    ]);
  },
};

export default register;
