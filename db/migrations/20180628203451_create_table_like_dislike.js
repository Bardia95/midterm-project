exports.up = function(knex, Promise) {
  return knex.schema.createTable("like_dislike", function(table) {
    table.increments("id").primary();
    table.integer("post_id");
    table.foreign("post_id").references("posts.id");
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.boolean("like_or_dislike");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("like_dislike");
};
