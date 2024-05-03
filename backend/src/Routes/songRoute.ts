import express from "express";
import {
  handleCreateSong,
  handleDislikeSong,
  handleGetLikedSong,
  handleLikeSong,
} from "../Controllers/songController";
const router = express.Router();

router.post("/create", handleCreateSong);
router.put("/like", handleLikeSong);
router.put("/dislike", handleDislikeSong);
router.get("/likedsong", handleGetLikedSong);

export default router;
