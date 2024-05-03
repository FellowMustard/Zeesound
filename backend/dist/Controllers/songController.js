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
    const id = req.id;
    try {
        const foundUser = yield User_1.default.findById(id, "likedSongs")
            .populate({
            path: "likedSongs",
            populate: { path: "author", select: "name" },
        })
            .exec();
        if (!foundUser)
            return res.sendStatus(403);
        res.status(200).json(foundUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.handleGetLikedSong = handleGetLikedSong;
//# sourceMappingURL=songController.js.map