import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class Auth {
  static generateToken(email, id) {
    const token = jwt.sign({ email, id }, process.env.SECRET_KEY, {
      expiresIn: "48h"
    });

    return token;
  }
}
