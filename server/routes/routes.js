const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const moment = require("moment");

const jwt = require("jsonwebtoken");

module.exports = knex => {
  const userUtils = require("./userUtils.js")(knex);

  // route to login
  router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    userUtils
      .loginAuthentication(username, password)
      .then(result => {
        // result is the user id
        req.session["user_id"] = result;
        jwt.sign({ user_id: result }, "secretkey", (err, token) => {
          // sends the token
          res.cookie("token", token);
          res.json(result);
        });
      })
      .catch(err => {
        console.log(err);

        res.json(err);
      });
  });

  router.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 10);
    const username = req.body.username;
    userUtils
      .registerNew(email, password, username)
      .then(result => {
        req.session["user_id"] = result;
        jwt.sign({ user_id: result }, "secretkey", (err, token) => {
          // sends the token
          res.cookie("token", token);
          res.send(true);
        });
      })
      .catch(err => {
        res.send(err);
      });
  });

  router.post("/post", (req, res) => {
    const type = req.body.type;
    const url = req.body.link;
    const title = req.body.title;
    const subject = req.body.subject;
    const description = req.body.description;
    const date = moment(parseInt(req.body.date)).format("l");
    const uId = parseInt(req.session["user_id"]);
    userUtils
      .newPost(type, url, title, subject, description, date, uId)
      .then(result => {
        res.send(true);
      })
      .catch(err => {
        console.log("failed");
        res.send(err);
      });
  });

  router.post("/post/comment/submit", (req, res) => {
    const content = req.body.content;
    const postID = req.body.post_id;
    const uId = parseInt(req.session["user_id"]);
    console.log("wtfwtf");
    knex("comments")
      .insert({
        text: content,
        user_id: uId,
        post_id: postID
      })
      .then(result => {
        res.json(result);
      });
  });

  router.post("/post/comment/render", (req, res) => {
    const postComments = knex("comments")
      .select("text", "username")
      .join("users", { "comments.user_id": "users.id" })
      .where({ post_id: req.body.post_id });
    postComments.then(results => {
      console.log(results);
      res.json(results);
    });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.clearCookie("token");
    res.send();
  });

  router.get("/render", async (req, res) => {
    // if user isnt logged in just render all posts
    if (req.headers["cookie"] === undefined) {
      try {
        const allPosts = await knex("posts").orderBy("date_posted");
        res.json([allPosts, 0]);
        return;
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      // if user is logged in render all posts with the ones they liked and disliked colored
      const token = getTokenFromCookie(req.headers["cookie"]);
      const decodedToken = jwt.verify(token, "secretkey");
      console.log(decodedToken);
      try {
        const allPosts = await knex("posts").orderBy("date_posted");
        const allLikesAndDislikes = await userUtils.findAllLikesAndDislikes(
          decodedToken["user_id"]
        );
        res.json([allPosts, allLikesAndDislikes]);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  });

  router.get("/user", async (req, res) => {
    const token = getTokenFromCookie(req.headers["cookie"]);
    // contains the user_id
    const decodedToken = jwt.verify(token, "secretkey");
    try {
      const ownPosts = await knex("posts")
        .where("user_id", "=", decodedToken["user_id"])
        .orderBy("date_posted");
      const allLikesAndDislikes = await userUtils.findAllLikesAndDislikes(decodedToken["user_id"]);
      const profileData = await knex("users").where("id", "=", decodedToken["user_id"]);
      res.json([ownPosts, allLikesAndDislikes, profileData]);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get("/user/likes", async (req, res) => {
    const token = getTokenFromCookie(req.headers["cookie"]);
    // contains the user_id
    const decodedToken = jwt.verify(token, "secretkey");
    try {
      const likedPosts = await knex
        .select(
          "posts.id",
          "posts.title",
          "posts.description",
          "posts.url",
          "posts.date_posted",
          "posts.subject",
          "posts.type",
          "posts.user_id",
          "posts.likes_count"
        )
        .from("posts")
        .join("like_dislike", { "like_dislike.post_id": "posts.id" })
        .where("like_dislike.user_id", "=", decodedToken["user_id"])
        .andWhere("like_dislike.like_or_dislike", "=", true)
        .orderBy("date_posted");
      const allLikesAndDislikes = await userUtils.findAllLikesAndDislikes(decodedToken["user_id"]);
      const profileData = await knex("users").where("id", "=", decodedToken["user_id"]);
      res.json([likedPosts, allLikesAndDislikes, profileData]);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.put("/like", (req, res) => {
    // first get the person's user id
    const token = getTokenFromCookie(req.headers["cookie"]);
    const decodedToken = jwt.verify(token, "secretkey");
    const user_id = decodedToken["user_id"];
    const post_id = req.body.post_id;
    // find out if already liked or disliked
    knex("like_dislike")
      .where({ user_id: user_id, post_id: post_id })
      .select("like_or_dislike")
      .then(result => {
        // check if liked/disliked already
        if (result[0]) {
          if (result[0]["like_or_dislike"] === true) {
            console.log("Person Already Liked This Post");
            res.json(3);
          } else {
            console.log("Person had this post disliked, liking now");
            // update the false to true
            knex("like_dislike")
              .where({
                post_id: post_id,
                user_id: user_id
              })
              .update({ like_or_dislike: true })
              .then(result => {
                // then update the likes_count in posts table + 2
                knex("posts")
                  .where({ id: post_id })
                  .update({ likes_count: knex.raw("?? + 2", ["likes_count"]) })
                  .then(result => {
                    res.json(2);
                  });
              });
          }
        } else if (!result[0]) {
          console.log("This person did not like or dislike this post, liking now");
          knex("like_dislike")
            .insert({
              post_id: post_id,
              user_id: user_id,
              like_or_dislike: true
            })
            .then(result => {
              // then update the likes_count in posts table + 1
              knex("posts")
                .where({ id: post_id })
                .update({ likes_count: knex.raw("?? + 1", ["likes_count"]) })
                .then(result => {
                  res.json(1);
                });
            });
        }
        // if already disliked switch false to true in table
      })
      .catch(err => {
        console.log("error occured");
        console.log(err);
      });
  });
  // Route For Dislikes
  router.put("/dislike", (req, res) => {
    // first get the person's user id
    const token = getTokenFromCookie(req.headers["cookie"]);
    const decodedToken = jwt.verify(token, "secretkey");
    const user_id = decodedToken["user_id"];
    const post_id = req.body.post_id;
    // find out if already liked or disliked
    knex("like_dislike")
      .where({ user_id: user_id, post_id: post_id })
      .select("like_or_dislike")
      .then(result => {
        // check if person already disliked post
        if (result[0]) {
          if (result[0]["like_or_dislike"] === false) {
            console.log("Person Already Disliked This Post");
            res.json(3);
          } else {
            console.log("Person had this post liked, disliking now");
            // update the true to false
            knex("like_dislike")
              .where({
                post_id: post_id,
                user_id: user_id
              })
              .update({ like_or_dislike: false })
              .then(result => {
                // then update the likes_count in posts table - 2
                knex("posts")
                  .where({ id: post_id })
                  .update({ likes_count: knex.raw("?? - 2", ["likes_count"]) })
                  .then(result => {
                    res.json(2);
                  });
              });
          }
        } else if (!result[0]) {
          console.log("This person did not like or dislike this post, disliking now");
          knex("like_dislike")
            .insert({
              post_id: post_id,
              user_id: user_id,
              like_or_dislike: false
            })
            .then(result => {
              // then update the like count
              knex("posts")
                .where({ id: post_id })
                .update({ likes_count: knex.raw("?? - 1", ["likes_count"]) })
                .then(result => {
                  res.json(1);
                });
            });
        }
      });
  });

  // Route to Edit Profile
  router.put("/editprofile", (req, res) => {
    const uId = parseInt(req.session["user_id"]);
    const newPassword = bcrypt.hashSync(req.body["newPassword"], 10);
    const oldPassword = req.body["oldPassword"];
    userUtils
      .changePassword(oldPassword, newPassword, uId)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(false);
      });
  });

  // Route to Search
  router.post("/search", (req, res) => {
    const searchterm = req.body["searchterm"];
    const type = req.body["type"];
    const subject = req.body["subject"];
    const knexQuery = userUtils.searchForPosts(searchterm, type, subject);
    if (knexQuery) {
      console.log("searching");
      knexQuery
        .then(async result => {
          if (!result[0]) {
            console.log("No search results");
            res.json(0);
          } else if (req.session["user_id"]) {
            // if user id is defined then we need to send the liked and disliked information too
            const uId = parseInt(req.session["user_id"]);
            const allLikesAndDislikes = await userUtils.findAllLikesAndDislikes(uId);
            res.json([result, allLikesAndDislikes]);
          } else {
            res.json([result, 0]);
          }
        })
        .catch(err => {
          console.log("this is the error");
          console.log(err);
        });
    } else {
      console.log("No search parameters");
      res.json(null);
    }
  });
  return router;

  function getTokenFromCookie(stringOfCookies) {
    let tokenString = stringOfCookies.split(" ")[0];
    tokenString = tokenString.substring(6, tokenString.length - 1);
    return tokenString;
  }
};
