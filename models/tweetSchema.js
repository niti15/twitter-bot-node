const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  id_str: {
    type: String,
    unique: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userDesc: {
    type: String,
    default: null,
  },
  reTweetCount: {
    type: Number,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Tweet", tweetSchema);
