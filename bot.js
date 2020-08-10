const Twitter = require("twitter");
const config = require("./config");

const controller = require("./controller/tweets.controller");

const client = new Twitter(config.twitterConfig);

// const stream = Twitter.stream("statuses/filter", {
//   track: ["#blockchain", "#bitcoin"],
//   language: "en",
// });

// stream.on("tweet", async function (tweet) {
//   console.log(tweet);
// });
// stream.on("error", function (error) {
//   console.log("error");
//   console.log(error);
// });

module.exports.sendDirectMessage = () => {
  const params = {
    // q: '#blockchain OR #bitcoin, -filter:retweets',
    q: "#blockchain OR #bitcoin",
    result_type: "recent",
    lang: "en",
  };

  client.get("search/tweets", params, async (err, data) => {
    if (!err) {
      // console.log(data.statuses);
      controller.getUniqueTweets(data.statuses).then((tweets) => {
        controller.recordUniqueTweets(tweets);
      });
    } else {
      console.log("Something went wrong while searching.");
    }
  });
};
