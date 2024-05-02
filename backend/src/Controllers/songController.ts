import { Request, Response } from "express";
import Song from "../Model/Song";
import { ObjectId } from "mongodb";

export const handleCreateSong = async (req: Request, res: Response) => {
  const { title, songPath, imagePath, authorId } = req.body;
  if (!title || !songPath || !imagePath || !authorId)
    return res
      .status(400)
      .json({ message: "Please provide full credentials!" });
  try {
    const song = await Song.create({
      title,
      songPath,
      imagePath,
      author: authorId as ObjectId,
      createdBy: req.id as ObjectId,
    });

    res.status(201).json({
      message: `Song ${song.title} successfully created`,
      id: song._id,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
