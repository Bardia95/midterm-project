const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

module.exports = knex => {
  // route to login
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(password);

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

  return router;
};
