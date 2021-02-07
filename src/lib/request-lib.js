import { systemDB } from './db';
import Knex from 'knex';

const register = {
  name: 'request-lib',
  version: '1.0.0',
  register: async function (server, options) {
    function getSystemDB() {
      const db = Knex(systemDB);
      return db;
    }

    server.decorate('request', 'systemDB', getSystemDB);
  },
};

export default register;
