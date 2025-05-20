import express from "express";
import upload from "../middleware/multer.ts";

import {
  add_product,
  list_products,
  remove_product,
  get_product,
} from "../controllers/product_controller.ts";
import admin_authorization from "../middleware/admin_authorization.ts";

const product_router = express.Router();

product_router.post(
  "/add",
  admin_authorization,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  add_product
);
product_router.get("/list", list_products);

product_router.post("/remove", admin_authorization, remove_product);

product_router.get("/get_product", get_product);

export default product_router;
