import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

import product_model from "../models/product_model.ts";

interface MulterRequest extends Request {
  files?:
    | {
        [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[];
}

const add_product = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    if (
      !req.files ||
      typeof req.files !== "object" ||
      Array.isArray(req.files)
    ) {
      res.status(400).json({ success: false, message: "No files uploaded" });
      return;
    }

    const image_1 = req.files.image_1?.[0];
    const image_2 = req.files.image_2?.[0];
    const image_3 = req.files.image_3?.[0];
    const image_4 = req.files.image_4?.[0];

    const images = [image_1, image_2, image_3, image_4].filter(
      (item) => item !== undefined
    );

    let image_URL = await Promise.all(
      images.map(async (image) => {
        const { path } = image;
        const result = await cloudinary.uploader.upload(path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const new_product = new product_model({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      images: image_URL,
      date: Date.now(),
    });

    await new_product.save();

    console.log(new_product);

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

const list_products = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await product_model.find({});

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

const remove_product = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    await product_model.findByIdAndDelete(id);

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

const get_product = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_ID } = req.body;

    const product = await product_model.findById(product_ID);

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export { add_product, list_products, remove_product, get_product };
