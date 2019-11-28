const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class Auth {
  static generateToken(email, id) {
    const token = jwt.sign({ email, id }, process.env.SECRET_KEY, {
      expiresIn: "48h"
    });

    return token;
  }
}
module.exports = Auth;
