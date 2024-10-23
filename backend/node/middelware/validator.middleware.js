import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import { config } from "dotenv";
config();

const validator = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
 
  if (!token) {
    return res
      .status(401)
      .json({ status: "Error", message: "Unauthorized Access" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode._id);
    if (!user) {
      return res
        .status(401)
        .json({ status: "Error", message: "Unauthorized Access" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "Error", message: "Unauthorized Access" });
  }
};
export default validator