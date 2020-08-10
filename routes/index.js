const express = require("express");
const router = express.Router();

const controller = require("../controller/tweets.controller");

router.get("/", (req, res) => {
  res.status(200).json({
    status: "200",
    message: "Bot v1.0",
  });
});

router.get("/tweets/all", controller.getAllTweets);
router.get("/tweets/byuser", controller.getTweetsByuserName);

module.exports = router;
