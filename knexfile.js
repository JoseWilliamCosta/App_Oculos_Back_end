// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  /*development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },*/

  //staging: {
    client: 'mysql2',
    connection: {
      //host: '127.0.0.1',
      host: '127.0.0.1',
      port: '3306',
      database: 'sistestdb',
      user:     'root',
      password: '123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  //},

  /*production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }*/

};