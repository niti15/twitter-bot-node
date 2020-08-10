const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cron = require("node-cron");

const indexRouter = require("./routes/index");

const bot = require("./bot");
const config = require("./config");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);

const mongoDB = config.mongoDBUrl;
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Just to insert data for first time
bot.sendDirectMessage();
cron.schedule("0 */30 * * * *", () => {
  console.log("running a task every 30 minutes");
  bot.sendDirectMessage();
});

// catch 404 and forward to error handler
app.use(function notFoundError(req, res) {
  res.status(404).json({
    status: "404",
    error: "not found",
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err.message,
  });
});

module.exports = app;
