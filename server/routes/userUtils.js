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

  function registerNew(email, password, username) {
    return new Promise(async (resolve, reject) => {
      // check if email already exists in database
      const emailResult = await knex("users").where({ email: email });
      if (emailResult[0]) {
        console.log("Email already exists in database");
        reject("Email Already Exists");
        return;
      }
      // check if username already exists in database
      const usernameResult = await knex("users").where({ username: username });
      if (usernameResult[0]) {
        console.log("Username already exists in database");
        reject("Username Already Exists");
        return;
      }
      // insert into database
      knex("users")
        .insert({ email: email, password: password, username: username })
        .returning("id")
        .then(result => {
          console.log("User Added to DB");
          resolve(result[0]);
        });
    });
  }

  function newPost(type, url, title, subject, description, date, uId) {
    return new Promise((resolve, reject) => {
      knex("posts")
        .insert({
          type: `${type}`,
          subject: `${subject}`,
          title: `${title}`,
          description: `${description}`,
          url: `${url}`,
          date_posted: `${date}`,
          user_id: uId
        })
        .then(result => {
          console.log(result);
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function findAllLikesAndDislikes(user_id) {
    return new Promise((resolve, reject) => {
      knex("like_dislike")
        .where({ user_id: user_id })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  function changePassword(password, userid) {
    return new Promise((resolve, reject) => {
      knex("users")
        .where({ id: userid })
        .update({ password: password })
        .then(result => {
          console.log("Password Updated");
          resolve(result);
        })
        .catch(err => {
          console.log("Could not find user associated");
          reject(err);
        });
    });
  }

  return {
    loginAuthentication: loginAuthentication,
    registerNew: registerNew,
    newPost: newPost,
    findAllLikesAndDislikes: findAllLikesAndDislikes,
    changePassword: changePassword
  };
};
