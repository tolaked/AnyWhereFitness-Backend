const bcrypt = require("bcryptjs");
const Users = require("../models/dbModel");
const auth = require("../middleware/auth");

class Auth {
  async createUser(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 11);

    const newUser = { ...req.body };

    return Users.add(newUser, "users")
      .then(saved => {
        const [newUser] = saved;
        const payload = {
          id: newUser.id,
          role: newUser.role
        };

        const options = {
          expiresIn: "24h"
        };

        const token = auth.generateToken(payload, options);

        delete newUser.password;
        return res.status(201).json({ newUser, token });
      })
      .catch(error => {
        if (error && error.routine === "_bt_check_unique") {
          return res
            .status(409)
            .json({ status: 409, message: "email already exists" });
        } else {
          return res
            .status(500)
            .json({ status: 500, message: "something went wrong" });
        }
      });
  }

  /**
   * @description Log in a valid user
   *
   * @param {*} req
   * @param {*} res
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findBy({ email });
      console.log(user);

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid username/password" });
      }

      const payload = {
        id: user.id,
        role: user.role
      };

      const options = {
        expiresIn: "24h"
      };

      const token = auth.generateToken(payload, options);

      return res.status(200).json({
        message: "Login successfully",
        token
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new Auth();
