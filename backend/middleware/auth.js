const jwt = require("jsonwebtoken");
require("dotenv/config");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const contentDecoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.userId = contentDecoded.id;
    }
    console.log(req.userId)
    next();
  } catch (error) {
    res.status(403).json({ message: "Not authenticated!" });
  }
};

module.exports.auth = auth;