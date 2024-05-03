"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songPublicController_1 = require("../Controllers/songPublicController");
const router = express_1.default.Router();
router.get("/new-song", songPublicController_1.handleGetNewSong);
router.get("/find/:id", songPublicController_1.handleSearchSong);
router.get("/author/:id", songPublicController_1.handleSearchSongByAuthor);
exports.default = router;
//# sourceMappingURL=songPublicRoute.js.map