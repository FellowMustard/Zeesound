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
exports.handleSearchSongByAuthor = exports.handleSearchSong = exports.handleGetNewSong = void 0;
const Song_1 = __importDefault(require("../Model/Song"));
const handleGetNewSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let songs;
    const all = req.query.all;
    try {
        if (all) {
            songs = yield Song_1.default.find()
                .populate("author", "name")
                .sort({ createdAt: -1 })
                .limit(20);
        }
        else {
            songs = yield Song_1.default.find()
                .populate("author", "name")
                .sort({ createdAt: -1 })
                .limit(6);
        }
        res.status(200).json(songs);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.handleGetNewSong = handleGetNewSong;
const handleSearchSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield Song_1.default.findById(id)
            .populate("author", "_id name pic")
            .exec();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.handleSearchSong = handleSearchSong;
const handleSearchSongByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield Song_1.default.find({ author: id })
            .populate("author", "_id name pic")
            .exec();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.handleSearchSongByAuthor = handleSearchSongByAuthor;
//# sourceMappingURL=songPublicController.js.map