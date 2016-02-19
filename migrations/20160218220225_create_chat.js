
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.timestamps();
  })
  .createTable('messages', function (table) {
    table.increments();
    table.integer('userId');
    table.string('message');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {

};
