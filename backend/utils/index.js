const jwt = require("jsonwebtoken");
require("dotenv/config")

module.exports.generateAccessToken = (object) => {
  return jwt.sign(object, process.env.JWT_TOKEN, { expiresIn: '30d' });
}