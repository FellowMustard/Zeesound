import express from "express";
import {
  handleGetNewSong,
  handleSearchSong,
  handleSearchSongByAuthor,
} from "../Controllers/songPublicController";
const router = express.Router();

router.get("/new-song", handleGetNewSong);
router.get("/find/:id", handleSearchSong);
router.get("/author/:id", handleSearchSongByAuthor);

export default router;
