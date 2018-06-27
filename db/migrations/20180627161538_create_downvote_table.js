exports.up = function(knex, Promise) {
  return knex.schema.createTable("downvotes", function(table) {
    table.integer("post_id");
    table.foreign("post_id").references("posts.id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("downvotes");
};
