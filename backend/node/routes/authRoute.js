import express from "express";
import validator from "../middelware/validator.middleware.js";
import {
  getDetails,
  handleFact,
  loginController,
  registerController,
  logout
} from "../controllers/authController.js";
import { upload } from "../controllers/multer.js";
const router = express.Router();

router.route('/register').post(upload.single('profilePicture'), registerController);

router.route("/login").post(loginController);
router.route("/fact").post(validator,handleFact)
router.route("/details").post(validator,getDetails)

router.route("/logout").post(validator,logout)

// router.post("/api",apiHandler)
export default router;
