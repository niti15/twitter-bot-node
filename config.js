require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const mongoDBUrl = `mongodb://${dbUser}:${dbPass}@dbh11.mlab.com:27117/${dbName}`;
const twitterConfig = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = {
  twitterConfig,
  mongoDBUrl,
};
