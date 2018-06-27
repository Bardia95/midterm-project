require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sassMiddleware = require("node-sass-middleware");

const app = express();
const path = require("path");

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");

const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

app.use(
  cookieSession({
    name: "session",
    keys: ["user_id"]
  })
);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(bodyParser.urlencoded({ extended: true }));

console.log(path.join(__dirname, "../styles"));
console.log(path.join(__dirname, "../public"));
app.use(
  sassMiddleware({
    src: path.join(__dirname, "../styles"),
    dest: path.join(__dirname, "../public"),
    debug: true,
    outputStyle: "compressed"
  })
);
app.use(express.static(path.join(__dirname, "../public/")));

// Mount all resource routes
app.use("/", usersRoutes(knex));

// Home page

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});