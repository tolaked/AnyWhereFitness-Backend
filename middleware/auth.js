const jwt = require("jsonwebtoken");

const Users = require("../models/dbModel");

class Auth {
  generateToken(payload = {}, options = {}) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, options);

    return token;
  }

  async verifyAdminToken(req, res, next) {
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

      const id = decodedToken.id;
      // find user by email
      const user = await Users.findBy({ id });

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
      req.user = user;
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
  }

  async verifyToken(req, res) {
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

      const id = decodedToken.id;
      // find user by email
      const user = await Users.findBy({ id });

      // check if user exist
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: "Invalid token provided"
        });
      }

      // make current logged in user email available
      req.user = user;
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
  }

  async canDelete(req, res, next) {
    try {
      const instructorId = req.user.id;
      const classId = parseInt(req.params.id);

      const userClass = await Users.findBy({ id: classId }, "classes");

      if (!userClass) {
        return res.status(404).json({
          status: 404,
          message: "class not found"
        });
      }

      if (userClass.instructorId !== instructorId) {
        return res.status(403).json({
          status: 403,
          message: "Sorry, you cannot delete this class"
        });
      }

      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
  }

  async classCapacity(req, res, next) {
    try {
      const classId = parseInt(req.params.id);
      const singleClass = await Users.findById(classId);
      if (
        singleClass.registeredAttendees === parseInt(singleClass.maxClassSize)
      ) {
        return res.status(409).json({
          status: 409,
          message: "No available spots for this class"
        });
      }

      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
  }
}
module.exports = new Auth();
