import userModel from "../models/userModels.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import axios from "axios";

export const registerController = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
    console.log(fname + " " + profilePicture);
    // Validation checks
    if (!fname) {
      return res.send({ error: "First Name is required" });
    }
    if (!lname) {
      return res.send({ error: "Last Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user with the profile picture path
    const user = await new userModel({
      fname,
      lname,
      email,
      password: hashedPassword,
      image:profilePicture, // Store the profile picture path
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        mesaage: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //TOKEN
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const handleFact = async (req, res) => {
  const { text, id } = req.body;
  const user = await userModel.findById(id);
  if (!user)
    res.status(500).send({
      message: "No user found",
    });
    else{
      console.log("user found :- "+user.fname)
    }
  try {
    const resp = await axios.post("http://127.0.0.1:5000//api/model", {
      fact: text,
    });
    const newFact ={
      fact:text,
      result:resp.data.prediction
    }
    user.history.push(newFact)
    await user.save();
    res.status(200).send(resp.data);
  } catch (error) {
    console.error(error);
    res.status(404).send({ success: false });
  }
};

export const getDetails = async (req, res) => {
  const { id } = req.body; // Extracting 'id' from the request body

  try {
    const user = await userModel.findById(id);
    // console.log(id + " " + user);
    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    
    return res.status(200).send({ data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).send({ message: "Server error" });
  }
};
