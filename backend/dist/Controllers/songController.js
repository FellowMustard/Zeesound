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
exports.handleCreateSong = void 0;
const Song_1 = __importDefault(require("../Model/Song"));
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
//# sourceMappingURL=songController.js.map