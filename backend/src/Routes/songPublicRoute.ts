import express from "express";
import {
  handleGetNewSong,
  handleSearchSong,
} from "../Controllers/songPublicController";
const router = express.Router();

router.get("/new-song", handleGetNewSong);
router.get("/find/:id", handleSearchSong);

export default router;
