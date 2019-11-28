const bcrypt = require("bcryptjs");
const Users = require("../models/dbModel");
const auth = require("../middleware/auth");
const knex = require("../data/dbConfig");

class Auth {
  static async createUser(req, res) {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 11);
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      password: hash,
      email: user.email,
      role: user.role
    };

    knex("users")
      .insert(newUser)
      .then(function() {
        knex
          .select()
          .from("users")
          .where("email", newUser.email)
          .then(function(user) {
            const [savedUser] = user;
            const token = auth.generateToken(savedUser);
            delete savedUser.password;
            res.send({ savedUser, token });
          });
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
