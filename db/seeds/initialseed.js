exports.seed = function(knex, Promise) {
  function deleteDownvotes() {
    return knex("downvotes").del();
  }
  function deleteUpvotes() {
    return knex("upvotes").del();
  }
  function deletePostComments() {
    return knex("comments_posts").del();
  }
  function deleteComments() {
    return knex("comments").del();
  }
  function deletePosts() {
    return knex("posts").del();
  }
  function deleteUsers() {
    return knex("users").del();
  }
  function insertUsers() {
    return knex("users")
      .insert([
        { email: "tommy@example.com", password: "123", username: "tommy" },
        { email: "bardia@example.com", password: "123", username: "bardia" },
        { email: "farid@example.com", password: "123", username: "farid" }
      ])
      .returning("*");
  }
  function insertPosts(users) {
    return knex("posts")
      .insert([
        {
          title: "Cool Trance Song",
          description: "yo this song is blessed",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-03-25",
          subject: "music",
          type: "link",
          user_id: users[0].id
        },
        {
          title: "Cool Trance Song",
          description: "yo this song is blessed",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-03-25",
          subject: "music",
          type: "link",
          user_id: users[0].id
        },
        {
          title: "Cool Trance Song",
          description: "yo this song is blessed",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-03-25",
          subject: "music",
          type: "link",
          user_id: users[0].id
        },
        {
          title: "Cool Trance Song",
          description: "yo this song is blessed",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-03-25",
          subject: "music",
          type: "link",
          user_id: users[0].id
        },
        {
          title: "Math Solution",
          description: "this is a cool way to multiply stuff together",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-06-25",
          subject: "math",
          type: "image",
          user_id: users[1].id
        },
        {
          title: "Math Solution",
          description: "this is a cool way to multiply stuff together",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-06-25",
          subject: "math",
          type: "image",
          user_id: users[1].id
        },
        {
          title: "Math Solution",
          description: "this is a cool way to multiply stuff together",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-06-25",
          subject: "math",
          type: "image",
          user_id: users[1].id
        },
        {
          title: "Math Solution",
          description: "this is a cool way to multiply stuff together",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-06-25",
          subject: "math",
          type: "image",
          user_id: users[1].id
        },
        {
          title: "Cool Video",
          description: "yo this video is sick fam!",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-06-29",
          subject: "cars",
          type: "video",
          user_id: users[2].id
        },
        {
          title: "Cool Video",
          description: "yo this video is sick fam!",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-06-29",
          subject: "cars",
          type: "video",
          user_id: users[2].id
        },
        {
          title: "Cool Video",
          description: "yo this video is sick fam!",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-06-29",
          subject: "cars",
          type: "video",
          user_id: users[2].id
        },
        {
          title: "Cool Video",
          description: "yo this video is sick fam!",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-06-29",
          subject: "cars",
          type: "video",
          user_id: users[2].id
        }
      ])
      .returning("*");
  }

  function insertComments() {
    return knex("comments").insert([
      { text: "comment 1 yeah eh", date: "2018-06-30", user_id: 1 },
      { text: "comment 2 yoooo sick", date: "2018-06-30", user_id: 2 },
      { text: "comment 3 brooooo", date: "2018-06-30", user_id: 3 }
    ]);
  }

  function insertCommentsPost() {
    return knex("comments_posts").insert([
      { comment_id: 1, post_id: 1 },
      { comment_id: 2, post_id: 2 },
      { comment_id: 3, post_id: 3 },
      { comment_id: 3, post_id: 4 },
      { comment_id: 1, post_id: 6 },
      { comment_id: 2, post_id: 6 },
      { comment_id: 3, post_id: 6 },
      { comment_id: 1, post_id: 1 },
      { comment_id: 2, post_id: 2 },
      { comment_id: 3, post_id: 10 },
      { comment_id: 1, post_id: 11 },
      { comment_id: 2, post_id: 12 }
    ]);
  }

  function insertUpvotes() {
    return knex("upvotes").insert([
      { post_id: 1, user_id: 1 },
      { post_id: 1, user_id: 2 },
      { post_id: 2, user_id: 1 },
      { post_id: 3, user_id: 1 },
      { post_id: 3, user_id: 2 }
    ]);
  }

  function insertDownvotes() {
    return knex("downvotes").insert([
      { post_id: 1, user_id: 3 },
      { post_id: 1, user_id: 3 },
      { post_id: 2, user_id: 3 },
      { post_id: 3, user_id: 3 },
      { post_id: 3, user_id: 3 }
    ]);
  }

  return deleteDownvotes()
    .then(deleteUpvotes)
    .then(deletePostComments)
    .then(deleteComments)
    .then(deletePosts)
    .then(deleteUsers)
    .then(insertUsers)
    .then(users => insertPosts(users))
    .then(insertComments)
    .then(insertCommentsPost)
    .then(insertUpvotes)
    .then(insertDownvotes);
};
