// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://postgres:Sweetmum@127.0.0.1:5432/Anywhere_Fitness",
    migrations: {
      directory: "./data/migrations"
    },

    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,

    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true
  }
};
