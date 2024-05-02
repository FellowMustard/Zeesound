import express from "express";
import {
  handleCreateAuthor,
  handleSearchAuthor,
} from "../Controllers/authorController";

const router = express.Router();

router.get("/find/:name", handleSearchAuthor);
router.post("/create", handleCreateAuthor);

export default router;
