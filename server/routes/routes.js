const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const moment = require("moment");

module.exports = knex => {
  // route to login
  router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // check if username exists in database
    knex("users")
      .where({ username: username })
      .then(function(result) {
        if (!result || !result[0]) {
          console.log("invalid username");
          res.send(false);
          return;
        }
        var pass = result[0].password;
        if (bcrypt.compareSync(password, pass)) {
          console.log("Logged in");
          req.session["user_id"] = result[0]["id"];
          res.send(true);
        } else {
          console.log("Wrong Password");
          res.send(false);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  router.post("/register", async (req, res) => {
    const email = req.body.email;
    console.log(req.body);
    const password = bcrypt.hashSync(req.body.password, 10);
    const username = req.body.username;
    console.log(req.body);

    // check if email already exists in database
    const emailResult = await knex("users").where({ email: email });
    if (emailResult[0]) {
      console.log("Email already exists in database");
      res.send(false);
      return;
    }
    // check if username already exists in database
    const usernameResult = await knex("users").where({ username: username });
    if (usernameResult[0]) {
      console.log("Username already exists in database");
      res.send(false);
      return;
    }
    // insert into database
    knex("users")
      .insert({ email: email, password: password, username: username })
      .returning("id")
      .then(result => {
        req.session["user_id"] = result[0];
        res.send(true);
      });
  });


  router.post("/post", (req, res) => {
    const type = req.body.type;
    const URL = req.body.link;
    const title = req.body.title;
    const subject = req.body.subject;
    const description = req.body.description;
    const date = parseInt(req.body.date);
    const uId = parseInt(req.session["user_id"]);
    knex("posts")
      .insert({
        type: `'${type}'`,
        subject: `'${subject}'`,
        title: `'${title}'`,
        description: `'${description}'`,
        url: `'${URL}'`,
        date_posted: `'${moment(date).format("l")}'`,
        user_id: uId
      })
      .then(result => {
        res.send(true);
      });
  });

  // router.post("/posts/:id/comment", (req, res) => {
  //   const content = req.body.content;
  //   const uId = parseInt(req.session["user_id"]);
  //   const comment_id =
  //   const
  //   knex("comments")
  //     .insert({
  //       content: content,
  //       user_id: uId
  //     }).then(result => {
  //       knex("comments_posts")
  //       .insert({
  //         comment_id: knex('comments').select(',
  //         post_id: 1
  //       })
  //     }).then(result => {
  //       res.send(true);
  //     });
  // });

  // route to log out
  router.post("/logout", (req, res) => {
    req.session = null;
    res.send();
  });
  // route to render posts
  router.post("/render", async (req, res) => {
    try {
      let query= knex('posts');
      if (req.query.user_id) {
        query = query.whereIn('user_id', req.query.user_id)
      }
      const allPosts = await query
      res.json(allPosts);
    } catch(err) {
      res.status(500).send(err)
    }
  });

  router.post("/user", async (req, res) => {
    try {
      let username = req.body.username.toString();
      const userId = await knex('users').select('id')
                      .where("username","=",username);
      const ownPosts = await knex('posts').where("user_id","=", userId[0].id);
      res.json(ownPosts);
    } catch(err) {
      res.status(500).send(err)
    }
  })

  return router;
};
