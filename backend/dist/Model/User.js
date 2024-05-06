"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    likedPlaylist: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Playlist",
        },
    ],
    likedSongs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Song",
        },
    ],
    refreshToken: [],
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map