import { v2 as cloudinary } from "cloudinary";

const connect_cloudinary = async () => {
  try {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error("Cloudinary environment variables not set");
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary connection successful!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to connect to Cloudinary:", error.message);
    } else {
      console.error("An unknown error occurred while connecting to Cloudinary");
    }
    throw error;
  }
};

export default connect_cloudinary;
