exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("firstName", 128).notNullable();
    table.string("lastName", 128).notNullable();
    table
      .string("email", 128)
      .unique()
      .notNullable();
    table.string("password", 128).notNullable();
    table.string("role", 128).notNullable();
  });
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
