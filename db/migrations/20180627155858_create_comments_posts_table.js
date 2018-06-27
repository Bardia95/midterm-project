exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments_posts", function(table) {
    table.integer("comment_id");
    table.foreign("comment_id").references("comments.id");
    table.integer("post_id");
    table.foreign("post_id").references("posts.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments_posts");
};
