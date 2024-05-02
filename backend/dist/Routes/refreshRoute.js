"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshController_1 = require("../Controllers/refreshController");
const router = express_1.default.Router();
router.get("/", refreshController_1.handleRefreshToken);
exports.default = router;
//# sourceMappingURL=refreshRoute.js.map