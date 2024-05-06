"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
const authRoute_1 = __importDefault(require("./Routes/authRoute"));
const refreshRoute_1 = __importDefault(require("./Routes/refreshRoute"));
const authorRoute_1 = __importDefault(require("./Routes/authorRoute"));
const songRoute_1 = __importDefault(require("./Routes/songRoute"));
const songPublicRoute_1 = __importDefault(require("./Routes/songPublicRoute"));
const dbConnect_1 = __importDefault(require("./Config/dbConnect"));
const corsConfig_1 = require("./Middleware/corsConfig");
const jwtVerify_1 = require("./Middleware/jwtVerify");
app.use((0, cors_1.default)(corsConfig_1.corsConfig));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, dbConnect_1.default)();
app.use("/api/public/song", songPublicRoute_1.default);
app.use("/api/auth", authRoute_1.default);
app.use("/api/refresh", refreshRoute_1.default);
app.use("/api/author", jwtVerify_1.verifyJWT, authorRoute_1.default);
app.use("/api/song", jwtVerify_1.verifyJWT, songRoute_1.default);
app.listen(PORT, () => {
    console.log("server is up and running");
});
//# sourceMappingURL=index.js.map