import mongoose from "mongoose";

const factSchema = new mongoose.Schema({
  fact: {
    type: String,
    require: true,
  },
  result:{
    type:String,
    require:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    default: () => new Date().toTimeString().split(" ")[0],
  },
});
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },
    lname: {
      type: String,
      required: true,
      trim: true,
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
    image: {
      type: String,
    },
    history:{
      type:[factSchema]
    },
    refreshToken:{
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
