import express from "express";
import { handleRefreshToken } from "../Controllers/refreshController";
const router = express.Router();

router.get("/", handleRefreshToken);

export default router;
