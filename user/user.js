const Users = require("../models/dbModel");

module.exports = {
  postReservation(req, res, next) {
    const userId = req.user.id;
    const id = parseInt(req.params.id);
    const classId = id;
    const data = { userId, classId };

    Users.addReservation(data, classId)
      .then(reservation => {
        const registeredAttendees = reservation.registeredAttendees + 1;

        return Users.editClass({ id }, { registeredAttendees }).then(
          updatedClass => {
            return res.status(200).json({
              status: 200,
              updatedClass,
              message: "spot reserved"
            });
          }
        );
      })
      .catch(error => {
        return res.status(400).json({
          status: 400,
          message: "something went wrong"
        });
      });
  }
};
