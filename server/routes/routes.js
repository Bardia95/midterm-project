const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const moment = require("moment");

module.exports = knex => {
  // route to login
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check if email exists in database
    knex("users")
      .where({ email: email })
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
        date_posted: `'${moment(date).format('l')}'`,
        user_id: uId
      }).then(result => {
        console.log(knex("posts")
                 .select('id')
                 .where({date_posted: `'${moment(date).format('l')}'`})
                 .limit(1));
        res.send(knex("posts")
                 .select('id')
                 .where({date_posted: `'${moment(date).format('l')}'`})
                 .limit(1));

      });
  });

  router.post("/posts/:id/comment", (req, res) => {
    const content = req.body.content;
    const uId = parseInt(req.session["user_id"]);
    knex("comments")
      .insert({
        user_id: uId
      }).then(result => {
        knex("comments_posts")
        .insert({
          comment_id: 1,
          post_id: 1
        })
      }).then(result => {
        res.send(true);
      });
  });

  // route to log out
  router.post("/logout", (req, res) => {
    req.session = null;
    res.send();
  });
  return router;
};
