const moment = require("moment");

const Users = require("../models/dbModel");

module.exports = {
  addClass(req, res) {
    req.body.instructorId = req.user.id;
    const classDetails = { ...req.body };

    return Users.add(classDetails, "classes")
      .then(saved => {
        return res.status(201).json({
          status: 201,
          message: "class created successfully",
          saved
        });
      })
      .catch(error => {
        return res.status(500).json({
          status: 500,
          message: error
        });
      });
  },

  editClass(req, res) {
    const id = parseInt(req.params.id);
    const changes = req.body;

    return Users.editClass({ id }, changes)
      .then(updatedClass => {
        return res.status(201).json({
          status: 200,
          message: "class updated successfully",
          updatedClass
        });
      })
      .catch(error => {
        return res.status(500).json({
          status: 500,
          message: error
        });
      });
  },

  deleteClass(req, res) {
    const id = parseInt(req.params.id);

    return Users.deleteClass(id)
      .then(deletedClass => {
        return res.status(200).json({
          status: 200,
          message: "Class deleted successfully"
        });
      })
      .catch(error => {
        return error;
      });
  },

  getClass(req, res) {
    Users.getClass().then(allClass => {
      return res.status(200).json({
        status: 200,
        message: `${allClass.length} classes found`,
        classes: allClass
      });
    });
  },

  findClass(req, res) {
    const id = parseInt(req.params.id);
    Users.findById(id).then(singleClass => {
      return res.status(200).json({
        status: 200,
        data: singleClass
      });
    });
  }
};
