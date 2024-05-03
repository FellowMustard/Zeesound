import { Request, Response } from "express";
import Song from "../Model/Song";

export const handleGetNewSong = async (req: Request, res: Response) => {
  let songs: any;
  const all = req.query.all;
  try {
    if (all) {
      songs = await Song.find()
        .populate("author", "name")
        .sort({ createdAt: -1 })
        .limit(20);
    } else {
      songs = await Song.find()
        .populate("author", "name")
        .sort({ createdAt: -1 })
        .limit(6);
    }
    res.status(200).json(songs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const handleSearchSong = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await Song.findById(id)
      .populate("author", "_id name pic")
      .exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleSearchSongByAuthor = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await Song.find({ author: id })
      .populate("author", "_id name pic")
      .exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
