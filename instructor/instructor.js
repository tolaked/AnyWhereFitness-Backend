const Users = require("../models/dbModel");

module.exports = {
  addClass(req, res) {
    Users.addClass(req.body)
      .then(saved => {
        res.status(201).json({
          status: 201,
          message: "class created successfully",
          saved
        });
      })
      .catch(error => {
        res.status(500).json({
          status: 500,
          error: error
        });
      });
  }
};
