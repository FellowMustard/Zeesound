import { Request, Response } from "express";
import Song from "../Model/Song";
import { ObjectId } from "mongodb";
import User from "../Model/User";

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

export const handleLikeSong = async (req: Request, res: Response) => {
  const id = req.id;
  const { songId } = req.body;

  try {
    const foundUser = await User.findById(id).exec();
    if (!foundUser) return res.sendStatus(403);
    const foundSong = await Song.findById(songId).exec();
    if (!foundSong) return res.status(404).json({ message: "Song not found!" });

    foundUser.likedSongs.push(songId);
    await foundUser.save();

    foundSong.likes++;
    await foundSong.save();

    res.sendStatus(200);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const handleDislikeSong = async (req: Request, res: Response) => {
  const id = req.id;
  const { songId } = req.body;

  try {
    const foundUser = await User.findById(id).exec();
    if (!foundUser) return res.sendStatus(403);
    const foundSong = await Song.findById(songId).exec();
    if (!foundSong) return res.status(404).json({ message: "Song not found!" });

    const index = foundUser.likedSongs.indexOf(songId);
    if (index !== -1) {
      foundUser.likedSongs.splice(index, 1);
      await foundUser.save();
    }

    if (foundSong.likes > 0) {
      foundSong.likes--;
      await foundSong.save();
    }

    res.sendStatus(200);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const handleGetLikedSong = async (req: Request, res: Response) => {
  const id = req.id;
  try {
    const foundUser = await User.findById(id, "likedSongs")
      .populate({
        path: "likedSongs",
        populate: { path: "author", select: "name" },
      })
      .exec();
    if (!foundUser) return res.sendStatus(403);
    res.status(200).json(foundUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
