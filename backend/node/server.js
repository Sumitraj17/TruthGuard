import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
const allowedOrigins = ['http://localhost:5173','http://localhost:5174'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


connectDB();
app.use('/uploads', express.static('uploads'));
app.use(cookieParser())
app.use("/api/v1/auth", authRoute);


app.get("/", (req, res) => {
  res.send("<h1>Hello Shivam Sumit</h1>");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`.bgMagenta.white);
});
