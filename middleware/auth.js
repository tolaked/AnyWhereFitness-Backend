const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const Users = require("../models/dbModel");

dotenv.config();

class Auth {
  static generateToken(email, id, role) {
    const token = jwt.sign({ email, id, role }, process.env.SECRET_KEY, {
      expiresIn: "48h"
    });

    return token;
  }
  static verifyToken(req, res, next) {
    const { token } = req.headers;

    // check if user provides a token
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: "Unauthorize, please login"
      });
    }

    // check if token is valid
    try {
      // decode and get token
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      // find user by email
      const user = Users.findUserBy(decodedToken.email);
      console.log();
      // check if user exist
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: "Invalid token provided"
        });
      }

      // Check if user is an instructor
      if (decodedToken.role !== "instructor") {
        return res.status(403).json({
          status: 403,
          error: "Only instructors can access this route"
        });
      }

      // make current logged in user email available
      req.user = decodedToken;
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
    next();
  }

  static isInstructor(req, res, next) {}
}
module.exports = Auth;
