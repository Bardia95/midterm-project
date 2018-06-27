const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

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

  router.post("/resource", (req, res) => {
    const type = req.body.type;
    const URL = req.body.link;
    const title = req.body.title;
    const subject = req.body.subject;
    const description = req.body.description;
    console.log("start send");
    knex("posts")
      .insert({
        type: `'${type}'`,
        subject: `'${subject}'`,
        title: `'${title}'`,
        description: `'${description}'`,
        url: `'${URL}'`
      })
      .returning("*")
      .then(result => {
        console.log(result);
        res.send(true);
      });
  });
  return router;
};