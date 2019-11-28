import bcrypt from "bcryptjs";
import Users from "../models/dbModel";
import auth from "../middleware/auth";

class Auth {
  static async createUser(req, res) {
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 14);
    req.body.password = hash;
    try {
      const user = await Users.addUser(req.body);
      const token = auth.generateToken(user);
      delete user.password;
      res
        .status(201)
        .json({ message: `welcome ${user.firstName}`, token, user });
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
  }
}

export default Auth;
