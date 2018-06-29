const bcrypt = require("bcryptjs");

module.exports = function(knex) {
  function loginAuthentication(username, password) {
    return new Promise((resolve, reject) => {
      knex("users")
        .where({ username: username })
        .then(function(result) {
          if (!result || !result[0]) {
            console.log("invalid username");
            reject("Invalid Username");
            return;
          }
          var pass = result[0].password;
          if (bcrypt.compareSync(password, pass)) {
            console.log("Logged in");
            resolve(result[0]["id"]);
          } else {
            console.log("Wrong Password");
            reject("Wrong Password");
          }
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
    });
  }
  // check if username exists in database

  return {
    loginAuthentication: loginAuthentication
  };
};
