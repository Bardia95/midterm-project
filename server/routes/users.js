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
        console.log(result);

        if (!result || !result[0]) {
          console.log("invalid username");
          res.send(false);
          return;
        }
        var pass = result[0].password;
        if (password === pass) {
          console.log("Logged in");
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
