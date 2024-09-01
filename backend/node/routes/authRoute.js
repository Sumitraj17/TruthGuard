import express from "express";
import {
  getDetails,
  handleFact,
  loginController,
  registerController,
} from "../controllers/authController.js";
import { upload } from "../controllers/multer.js";
const router = express.Router();

router.post("/register",upload.single('profilePicture'), registerController);

router.post("/login", loginController);
router.post("/fact",handleFact)
router.post("/details",getDetails)

// router.post("/api",apiHandler)
export default router;
