exports.seed = function(knex, Promise) {
  function deleteLikeDislike() {
    return knex("like_dislike").del();
  }
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
        {
          email: "tommy@example.com",
          password: "$2a$10$qp0wTG4JCz6e0jMlwLYjVuiK9.04F3sSyIOm5EayYGUXzgnAstET6",
          username: "tommy"
        },
        {
          email: "bardia@example.com",
          password: "$2a$10$qp0wTG4JCz6e0jMlwLYjVuiK9.04F3sSyIOm5EayYGUXzgnAstET6",
          username: "bardia"
        },
        {
          email: "farid@example.com",
          password: "$2a$10$qp0wTG4JCz6e0jMlwLYjVuiK9.04F3sSyIOm5EayYGUXzgnAstET6",
          username: "farid"
        }
      ])
      .returning("*");
  }
  function insertPosts(users) {
    return knex("posts")
      .insert([
        {
          title: "Great Bootcamp",
          description: "Awesome Developer Bootcamp",
          url: "https://www.lighthouselabs.ca",
          date_posted: "2018-06-29",
          subject: "web development",
          type: "course",
          user_id: users[0].id,
          likes_count: 1
        },
        {
          title: "Promises Tutorial",
          description: "Great introduction to promises",
          url: "https://www.youtube.com/watch?v=QO4NXhWo_NM",
          date_posted: "2018-06-29",
          subject: "web development",
          type: "tutorial",
          user_id: users[0].id,
          likes_count: -1
        },
        {
          title: "Article about virtual reality",
          description: "Great introduction to virtual reality",
          url: "https://www.vrs.org.uk/virtual-reality/what-is-virtual-reality.html",
          date_posted: "2018-06-29",
          subject: "virtual reality",
          type: "blog",
          user_id: users[0].id,
          likes_count: 1
        },
        {
          title: "iOS Development For Beginners",
          description: "Great blogpost for iOS development",
          url: "https://lifehacker.com/i-want-to-write-ios-apps-where-do-i-start-1644802175",
          date_posted: "2018-06-30",
          subject: "mobile development",
          type: "blog",
          user_id: users[0].id
        },
        {
          title: "Recursion tutorial",
          description: "Learn about Recursion here",
          url: "https://www.geeksforgeeks.org/recursion/",
          date_posted: "2018-06-30",
          subject: "web development",
          type: "tutorial",
          user_id: users[1].id
        },
        {
          title: "React Native!",
          description: "This is a great resource",
          url: "https://facebook.github.io/react-native",
          date_posted: "2018-06-30",
          subject: "mobile development",
          type: "documentation",
          user_id: users[1].id
        },
        {
          title: "PHP documentation",
          description: "this is cool",
          url: "http://php.net/docs.php",
          date_posted: "2018-07-01",
          subject: "web development",
          type: "documentation",
          user_id: users[1].id
        },
        {
          title: "Flex Box Tutorial",
          description: "Great resource for using flex box",
          url: "https://soundcloud.com/coldblue/cold-blue-rush-kearnage",
          date_posted: "2018-07-02",
          subject: "documentation",
          type: "web development",
          user_id: users[1].id
        }
      ])
      .returning("*");
  }

  function insertComments() {
    return knex("comments").insert([
      {
        text: "Great Stuff!",
        date: "2018-07-01",
        user_id: 1,
        post_id: 4
      },
      {
        text: "Very Helpful",
        date: "2018-07-01",
        user_id: 2,
        post_id: 5
      },
      {
        text: "Amazing",
        date: "2018-07-01",
        user_id: 3,
        post_id: 3
      }
    ]);
  }

  function insertCommentsPost() {}

  function insertUpvotes() {}

  function insertDownvotes() {}

  function insertLikeDislike() {
    return knex("like_dislike").insert([
      { post_id: 1, user_id: 1, like_or_dislike: true },
      { post_id: 2, user_id: 2, like_or_dislike: false },
      { post_id: 3, user_id: 3, like_or_dislike: true }
    ]);
  }

  return deleteLikeDislike()
    .then(deleteDownvotes)
    .then(deleteUpvotes)
    .then(deletePostComments)
    .then(deleteComments)
    .then(deletePosts)
    .then(deleteUsers)
    .then(insertUsers)
    .then(users => insertPosts(users))
    .then(insertComments)
    .then(insertLikeDislike);
};
