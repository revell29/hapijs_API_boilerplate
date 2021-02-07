exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('email');
    table.string('password');
    table.string('fullname');
    table.string('no_hp');
    table.string('alamat');
    table.timestamps();
  });
};

exports.down = function (knex) {};
