const express = require("express");

const router = express.Router();

module.exports = knex => {
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // check if email exists in database
    knex("users")
      .where({ email: email })
      .select("password")
      .then(function(result) {
        if (!result || !result[0]) {
          console.log("invalid username");
          return;
        }
        var pass = result[0].password;
        if (password === pass) {
          console.log("Logged in");
        } else {
          console.log("Wrong Password");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  return router;
};
