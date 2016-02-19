module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/knex-chat',
    pool: {
      min: 2,
      max: 10
    }
  }

};
