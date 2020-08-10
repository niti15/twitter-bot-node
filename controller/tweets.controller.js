const Tweet = require("../models/tweetSchema");

const helpers = require("../helpers");

// To get all the tweets from DB
const fetchTweets = async () => {
  return await Tweet.find({})
    .then((tweets) => {
      console.log(tweets);
      return tweets;
    })
    .catch((err) => console.log("Fetching tweets failed: ", err));
};

// To get the unique tweets
const getUniqueTweets = (latestTweets) => {
  return fetchTweets().then((recordedTweets) => {
    return latestTweets.filter(
      (newTweet) =>
        recordedTweets.find(
          (recorderTweet) => recorderTweet.id_str === newTweet.id_str
        ) === undefined
    );
  });
};

// To insert the single tweet in DB
const recordTweet = ({ id_str, text, user, created_at, retweet_count }) => {
  const tweet = new Tweet({
    id_str: id_str,
    text: text,
    userID: user.id_str,
    userName: user.name,
    userDesc: user.description,
    reTweetCount: retweet_count,
    created_at: helpers.getTime(created_at),
  });

  tweet
    .save()
    .then((tweet) => console.log("Tweet recorded: ", tweet))
    .catch((err) => console.log("Tweet recording failed: ", err));
};

// To insert the all the unique tweets to DB
const recordUniqueTweets = (tweets) => {
  tweets.forEach((tweet) => {
    recordTweet(tweet);
  });
};

// To get all the tweets from DB
const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find();
    // console.log(tweets);
    res.status(200).json({
      status: "200",
      message: "Success",
      data: tweets,
    });
  } catch (err) {
    console.log("Fetching tweets failed: ", err);
    res.status(500).json({
      status: "500",
      message: err,
    });
  }
};

// To get the tweets by userName
const getTweetsByuserName = async (req, res) => {
  try {
    // console.log(req.query);
    const tweets = await Tweet.find({ userName: req.query.username });
    // console.log(tweets);
    res.status(200).json({
      status: "200",
      message: "Success",
      data: tweets,
    });
  } catch (err) {
    console.log("Fetching tweets failed: ", err);
    res.status(500).json({
      status: "500",
      message: err,
    });
  }
};

module.exports = {
  fetchTweets,
  getUniqueTweets,
  recordUniqueTweets,
  getAllTweets,
  getTweetsByuserName,
};
