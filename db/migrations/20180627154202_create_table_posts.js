exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", function(table) {
    table.increments("id").primary();
    table.string("title");
    table.string("description");
    table.string("url");
    table.date("date_posted");
    table.string("subject");
    table.string("type");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts");
};
