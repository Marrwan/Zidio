const session = require("express-session");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const connectPgSimple = require("connect-pg-simple")(session);
// const swaggerUI = require("swagger-ui-express");
// const swaggers = require("swagger-node-express");
const authRouter = require("./routes/auth.route");
const usersRouter = require("./routes/users");
const message = require("./constants/messages.constant");
const { ROUTE_404_ERROR } = require("./middlewares/errors/ApiError");
const passportConfig = require("./config/passport/passport.config");
// const swaggerSpec = require("./swagger.config");

const sessionStore = new connectPgSimple({
  conString: process.env.DATABASE_URL,
  createTableIfMissing: true, // If session is not there, error.error: relation "session" does not exist at...
});
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

// app.get('/docs.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.send(swaggerSpec)
// })
// swaggers.setAppHandler(subpath);
// swaggers.createNew(subpath);
// swaggers.addModels(User);
// swaggers.configureSwaggerPaths("", "/docs", "");
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use("/auth", authRouter);
app.use("/users", usersRouter);
// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.all("*", () => {
  throw new ROUTE_404_ERROR();
});
app.use(function (err, _req, res, _next) {
  res.setHeader("Content-Type", "application/json");
  if (!err.statusCode) {
    console.log({ err });
    err.message = message.ERROR_500.message;
  }

  if (err.name && err.name == "validation error") {
    err.statusCode = 400;
    err.message = err.message.replace("ValidationError: ", "");
  }
  return res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = app;
