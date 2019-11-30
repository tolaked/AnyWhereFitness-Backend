const bcrypt = require("bcryptjs");
const Users = require("../models/dbModel");
const auth = require("../middleware/auth");

class Auth {
  static async createUser(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 11);

    const newUser = { ...req.body };

    Users.addUser(newUser)
      .then(saved => {
        const [newUser] = saved;
        const token = auth.generateToken(newUser);
        console.log(token);
        delete newUser.password;
        return res.status(201).json({ newUser, token });
      })
      .catch(error => {
        if (error && error.routine === "_bt_check_unique") {
          res
            .status(409)
            .json({ status: 409, message: "email already exists" });
        } else {
          res
            .status(500)
            .json({ status: 500, message: "something went wrong" });
        }
      });
  }

  static login(req, res) {
    let { email, password } = req.body;

    Users.findUserBy({ email })
      .first()
      .then(user => {
        // check if the provided password is correct
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = auth.generateToken(user);

          res
            .status(200)
            .json({ message: `Welcome ${user.firstName}!`, token: token });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
}

module.exports = Auth;
