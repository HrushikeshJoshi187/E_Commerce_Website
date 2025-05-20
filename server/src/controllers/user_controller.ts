import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import user_model from "../models/user_model.ts";

const create_token = (id: string) => {
  if (!process.env.JWT_SECRET) return null;

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

const login_user = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await user_model.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    const is_match = await bcrypt.compare(password, user.password);

    if (!is_match) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = create_token(user._id);

    if (!token) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    res.status(200).json({ success: true, token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

const register_user = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const exists = await user_model.findOne({ email });

    if (exists) {
      res.status(409).json({ success: false, message: "User already exists" });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({ success: false, message: "Invalid email" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const new_user = new user_model({
      name,
      email,
      password: hashed_password,
    });

    await new_user.save();

    const token = create_token(new_user._id);

    if (!token) {
      console.log("Inside");

      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    res.status(201).json({ success: true, token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

const login_admin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.JWT_SECRET
    ) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET);

    if (!token) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }

    res.status(200).json({ success: true, token });
    return;
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export { login_user, register_user, login_admin };
