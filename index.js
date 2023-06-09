const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const app = express();
const expresslayout = require("express-ejs-layouts");
const port = 8000;
//used for session cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const { param } = require("./routes");
const MongoStore = require('connect-mongo')(session);
const path = require('path');

app.use(express.static("./assets"));
// app.use(express.static(path.join(path.resolve(), "public")));

app.use(expresslayout);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.urlencoded());
app.use(cookieParser());

//to set up our view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    //toDO change the secret before deployement in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
          mongooseConnection: db,
          autoRemove: 'disabled'
      
      },
      function(err){
          console.log(err ||  'connect-mongodb setup ok');
      }
  )
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server ${err}`);
  }
  console.log(`server is running on port ${port}`);
});
