import { Request, Response } from "express";
import Song from "../Model/Song";
import { ObjectId } from "mongodb";
import User from "../Model/User";
import mongoose from "mongoose";

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
  const userId = new mongoose.Types.ObjectId(req.id); // Ensure userId is correctly extracted and converted to ObjectId
  const all = req.query.all; // Unused variable, remove if not needed
  const limitValue = all ? 1000000 : 6;
  try {
    let pipeline: any[] = [
      { $match: { _id: userId } }, // Match the user by their _id
      { $unwind: "$likedSongs" }, // Ensure likedSongs is an array
      { $limit: limitValue },
      {
        $lookup: {
          from: "songs", // Name of the collection where songs are stored
          localField: "likedSongs", // Field from the User model
          foreignField: "_id", // Field from the Song model
          as: "likedSongs", // Name of the field to populate
        },
      },
      { $unwind: "$likedSongs" },
      {
        $lookup: {
          from: "authors", // Name of the collection where authors are stored
          localField: "likedSongs.author", // Field from the Song model
          foreignField: "_id", // Field from the Author model
          as: "authorArray", // Name of the field to populate
        },
      },
      {
        $addFields: {
          "likedSongs.author": { $arrayElemAt: ["$authorArray", 0] },
        },
      },
      { $unset: "authorArray" }, // Remove the temporary array field
      {
        $group: {
          _id: "$_id",
          likedSongs: {
            $push: "$likedSongs",
          },
        },
      },
    ];

    const foundUser = await User.aggregate(pipeline);

    // Extract the liked songs array from the result
    const likedSongs = foundUser[0].likedSongs;

    res.status(200).json(likedSongs);
  } catch (err: any) {
    // Handle any errors that occur during execution
    res.status(500).json({ message: err.message });
  }
};
