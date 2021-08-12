const jwt = require("jsonwebtoken");

const jwtSecret = "134994964b9caf7d2ff9a74889827041c20a5fb0fc78b68488c294b853f973a5a89cdbd5f275cb42e80baf0373640dc39891d6c6f25b5265269c297f0566f81e";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const contentDecoded = jwt.verify(token, jwtSecret);
      req.userId = contentDecoded?.id;
    }
    next();
  } catch (error) {
    res.status(403).json({ message: "Not authenticated!" });
  }
};

module.exports.auth = auth;