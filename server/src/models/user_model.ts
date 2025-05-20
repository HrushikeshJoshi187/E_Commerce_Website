import mongoose from "mongoose";

const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const user_model = mongoose.models.user || mongoose.model("user", user_schema);

export default user_model;
