"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songController_1 = require("../Controllers/songController");
const router = express_1.default.Router();
router.post("/create", songController_1.handleCreateSong);
router.put("/like", songController_1.handleLikeSong);
router.put("/dislike", songController_1.handleDislikeSong);
router.get("/likedsong", songController_1.handleGetLikedSong);
exports.default = router;
//# sourceMappingURL=songRoute.js.map