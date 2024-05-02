import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();

import authRoute from "./Routes/authRoute";
import refreshRoute from "./Routes/refreshRoute";
import authorRoute from "./Routes/authorRoute";
import songRoute from "./Routes/songRoute";
import songPublicRoute from "./Routes/songPublicRoute";
import connectDB from "./Config/dbConnect";
import { corsConfig } from "./Middleware/corsConfig";
import { verifyJWT } from "./Middleware/jwtVerify";

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/public/song", songPublicRoute);
app.use("/api/auth", authRoute);
app.use("/api/refresh", refreshRoute);

app.use("/api/author", verifyJWT, authorRoute);
app.use("/api/song", verifyJWT, songRoute);

app.listen(PORT, () => {
  console.log("server is up and running");
});
