exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", function(table) {
    table.increments("id").primary();
    table.string("text");
    table.date("date");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
