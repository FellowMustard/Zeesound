"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetLikedSong = exports.handleDislikeSong = exports.handleLikeSong = exports.handleCreateSong = void 0;
const Song_1 = __importDefault(require("../Model/Song"));
const User_1 = __importDefault(require("../Model/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const handleCreateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, songPath, imagePath, authorId } = req.body;
    if (!title || !songPath || !imagePath || !authorId)
        return res
            .status(400)
            .json({ message: "Please provide full credentials!" });
    try {
        const song = yield Song_1.default.create({
            title,
            songPath,
            imagePath,
            author: authorId,
            createdBy: req.id,
        });
        res.status(201).json({
            message: `Song ${song.title} successfully created`,
            id: song._id,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.handleCreateSong = handleCreateSong;
const handleLikeSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const { songId } = req.body;
    try {
        const foundUser = yield User_1.default.findById(id).exec();
        if (!foundUser)
            return res.sendStatus(403);
        const foundSong = yield Song_1.default.findById(songId).exec();
        if (!foundSong)
            return res.status(404).json({ message: "Song not found!" });
        foundUser.likedSongs.push(songId);
        yield foundUser.save();
        foundSong.likes++;
        yield foundSong.save();
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.handleLikeSong = handleLikeSong;
const handleDislikeSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const { songId } = req.body;
    try {
        const foundUser = yield User_1.default.findById(id).exec();
        if (!foundUser)
            return res.sendStatus(403);
        const foundSong = yield Song_1.default.findById(songId).exec();
        if (!foundSong)
            return res.status(404).json({ message: "Song not found!" });
        const index = foundUser.likedSongs.indexOf(songId);
        if (index !== -1) {
            foundUser.likedSongs.splice(index, 1);
            yield foundUser.save();
        }
        if (foundSong.likes > 0) {
            foundSong.likes--;
            yield foundSong.save();
        }
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.handleDislikeSong = handleDislikeSong;
const handleGetLikedSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.default.Types.ObjectId(req.id); // Ensure userId is correctly extracted and converted to ObjectId
    const all = req.query.all; // Unused variable, remove if not needed
    const limitValue = all ? 1000000 : 6;
    try {
        let pipeline = [
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
        const foundUser = yield User_1.default.aggregate(pipeline);
        // Extract the liked songs array from the result
        const likedSongs = foundUser[0].likedSongs;
        res.status(200).json(likedSongs);
    }
    catch (err) {
        // Handle any errors that occur during execution
        res.status(500).json({ message: err.message });
    }
});
exports.handleGetLikedSong = handleGetLikedSong;
//# sourceMappingURL=songController.js.map