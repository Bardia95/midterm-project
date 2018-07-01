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

  function changePassword(oldpassword, newpassword, userid) {
    return new Promise((resolve, reject) => {
      knex("users")
        .where({ id: userid })
        .then(result => {
          // check if old password matches first, if it does then update password
          if (bcrypt.compareSync(oldpassword, result[0]["password"])) {
            console.log("old password match, changing new password");
            knex("users")
              .where({ id: userid })
              .update({ password: newpassword })
              .then(result => {
                resolve(result);
              });
          } else {
            console.log("Old passwords don't match. Password change failed");
            reject(result);
          }
        })
        .catch(err => {
          console.log("Could not find user associated");
          reject(err);
        });
    });
  }

  function searchForPosts(searchterm, type, subject) {
    if (searchterm === "" && type === "none" && subject === "none") {
      console.log("No parameters, no search will be conducted");
      return null;
    } else if (searchterm !== "" && type === "none" && subject === "none") {
      console.log("No type or subject. conducting search with only term");
      return knex("posts")
        .where("title", "like", `%${searchterm}%`)
        .orWhere("description", "like", `%${searchterm}%`)
        .orWhere("url", "like", `%${searchterm}%`);
    } else if (searchterm === "" && type === "none" && subject !== "none") {
      console.log("No search term, no type. conducting search with only subject");
      return knex("posts").where({ subject: subject });
    } else if (searchterm === "" && type !== "none" && subject === "none") {
      console.log("No search term, no subject. Conducting search with only type");
      return knex("posts").where({ type: type });
    } else if (searchterm !== "" && type === "none" && subject !== "none") {
      console.log("No Type specified. Conducting search with term and subject");
      return knex
        .select("*")
        .from(function() {
          this.select("*")
            .from("posts")
            .where("title", "like", `%${searchterm}%`)
            .orWhere("description", "like", `%${searchterm}%`)
            .orWhere("url", "like", `%${searchterm}%`)
            .as("subquery");
        })
        .where({ subject: subject });
    } else if (searchterm !== "" && type !== "none" && subject === "none") {
      console.log("No subject specificed. Conducting search with term and type");
      return knex
        .select("*")
        .from(function() {
          this.select("*")
            .from("posts")
            .where("title", "like", `%${searchterm}%`)
            .orWhere("description", "like", `%${searchterm}%`)
            .orWhere("url", "like", `%${searchterm}%`)
            .as("subquery");
        })
        .where({ type: type });
    } else if (searchterm === "" && type !== "none" && subject !== "none") {
      console.log("No search term specified conducting search with type and subject");
      return knex("posts")
        .where({ type: type })
        .andWhere({ subject: subject });
    } else if (searchterm !== "" && type !== "none" && subject !== "none") {
      console.log("Conducting search with all three");
      return knex
        .select("*")
        .from(function() {
          this.select("*")
            .from("posts")
            .where("title", "like", `%${searchterm}%`)
            .orWhere("description", "like", `%${searchterm}%`)
            .orWhere("url", "like", `%${searchterm}%`)
            .as("subquery");
        })
        .where({ type: type })
        .andWhere({ subject: subject });
    }
  }

  return {
    loginAuthentication: loginAuthentication,
    registerNew: registerNew,
    newPost: newPost,
    findAllLikesAndDislikes: findAllLikesAndDislikes,
    changePassword: changePassword,
    searchForPosts: searchForPosts
  };
};
