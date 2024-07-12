import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Database Successfully ${con.connection.host}`.bgBlue.white
    );
  } catch (error) {
    console.log(`Error in database ${error}`.bgYellow.white);
  }
};
export default connectDB;
