exports.up = function(knex, Promise) {
  return knex.schema.table("posts", function(table) {
    table
      .integer("likes_count")
      .notNull()
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("posts", function(table) {
    table.dropColumn("likes_count");
  });
};
