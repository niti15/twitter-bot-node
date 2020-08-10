require("dotenv").config();

const dbUser = process.env.DB_USER || "nithya";
const dbPass = process.env.DB_PASS || "12345678N";
const dbName = process.env.DB_NAME || "twitterbot";

const mongoDBUrl = `mongodb://${dbUser}:${dbPass}@dbh11.mlab.com:27117/${dbName}`;
const twitterConfig = {
  consumer_key: process.env.CONSUMER_KEY || "llmenRC0HExKpDcpHPUArUsvV",
  consumer_secret:
    process.env.CONSUMER_SECRET ||
    "24uIoBvvHcmat6XkyMHkbBtp0p4LYgfwQypReHIJmzKrDcSV2g",
  access_token_key:
    process.env.ACCESS_TOKEN ||
    "746656089937084416-hE5mVltPDrw0cmoD8ufCRumItpG4ggW",
  access_token_secret:
    process.env.ACCESS_TOKEN_SECRET ||
    "T2fWeJTynTf1SLSVomBlJd2cFDDEvuBTEefEjk4kcNPkm",
};

module.exports = {
  twitterConfig,
  mongoDBUrl,
};
