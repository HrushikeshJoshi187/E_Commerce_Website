import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import connect_mongoDB from "./config/mongodb.ts";
import connect_cloudinary from "./config/cloudinary.ts";
import user_router from "./routes/user_routes.ts";
import product_router from "./routes/product_routes.ts";

dotenv.config();

const app: Express = express();

const port: number = parseInt(process.env.PORT || "3000", 10);

connect_mongoDB();

connect_cloudinary();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/user", user_router);
app.use("/api/product", product_router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(port, () =>
  console.log(`[server]: Server is running at http://localhost:${port}`)
);
