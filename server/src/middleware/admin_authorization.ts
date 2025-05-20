import jwt from "jsonwebtoken";

const admin_authorization = (req: any, res: any, next: any) => {
  try {
    const { token } = req.headers;

    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export default admin_authorization;
