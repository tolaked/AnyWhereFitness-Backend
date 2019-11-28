import express from "express";
import Auth from "../auth/auth";

const { createUser } = Auth;
const router = express.Router();

router.post("/register", createUser);

export default router;
