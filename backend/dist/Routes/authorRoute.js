"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../Controllers/authorController");
const router = express_1.default.Router();
router.get("/find/:name", authorController_1.handleSearchAuthor);
router.post("/create", authorController_1.handleCreateAuthor);
exports.default = router;
//# sourceMappingURL=authorRoute.js.map