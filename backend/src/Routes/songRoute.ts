import express from "express";
import { handleCreateSong } from "../Controllers/songController";
const router = express.Router();

router.post("/create", handleCreateSong);

export default router;
