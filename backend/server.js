const express = require("express");
const app = express();
const routes = require("./routes");
const passport = require("passport");
const db = require("./db");
const path = require("path");
const PORT = 5000;
const cookieParser = require("cookie-parser");
const session = require("express-session");
var cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());

require("./auth/auth");

app.use("/api", routes);

app.use("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

db.sync({ force: false }).then(() => {
  //
  app.listen(PORT, () => {
    console.log("Escuchando en el puerto ", PORT);
  });
});
