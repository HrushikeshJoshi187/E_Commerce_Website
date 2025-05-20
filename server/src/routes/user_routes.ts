import express from "express";

import {
  login_user,
  register_user,
  login_admin,
} from "../controllers/user_controller.ts";

const user_router = express.Router();

user_router.post("/login_user", login_user);
user_router.post("/register_user", register_user);
user_router.post("/login_admin", login_admin);

export default user_router;
