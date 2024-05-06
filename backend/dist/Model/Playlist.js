"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const playlistSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    songs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Song",
        },
    ],
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
        required: true,
    },
}, { timestamps: true });
const Playlist = mongoose_1.default.model("Playlist", playlistSchema);
exports.default = Playlist;
//# sourceMappingURL=Playlist.js.map