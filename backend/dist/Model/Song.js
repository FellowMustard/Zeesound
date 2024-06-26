"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const songSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    songPath: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
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
const Song = mongoose_1.default.model("Song", songSchema);
exports.default = Song;
//# sourceMappingURL=Song.js.map