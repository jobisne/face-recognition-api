const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register')
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const knex = require("knex");

const app = express();

const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "jobi",
    database: "smart_brain",
  },
});

const query = db.select("*").from("users");
// console.log(query);


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("this is working");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

//dependency injection => passing what the function need
app.post("/register", (req, res) => { register.handleRegister(req, res, bcrypt, db)});

app.get("/profile/:id", (req, res) => { profile.handleProfile(req, res, db)});

app.post("/imageUrl", (req, res) => { image.handleApiCall(req, res) });

app.put("/image", (req, res) => { image.handleImage(req, res, db) });

app.listen(process.env.PORT || 3000, () => {
  console.log(` app is running at port ${process.env.PORT}`);
});
