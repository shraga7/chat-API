import express from "express";
import { register, login, getLoggedUser } from "../controllers/auth";

import { protect } from "../middleware/auth";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/me").get(protect, getLoggedUser);

export default router;
