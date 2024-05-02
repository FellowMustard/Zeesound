import express from "express";
import {
  handleLogin,
  handleLogout,
  handleRegister,
} from "../Controllers/authController";

const router = express.Router();

router.post("/", handleRegister);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);

export default router;
