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
exports.handleRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../Model/User"));
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    const foundUser = yield User_1.default.findOne({ refreshToken }).exec();
    ///Found Used Token
    if (!foundUser) {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return res.sendStatus(403);
            const hackedUser = yield User_1.default.findById({ id: decoded.id });
            if (hackedUser) {
                hackedUser.refreshToken = [];
                yield hackedUser.save();
            }
        }));
        return res.sendStatus(403);
    }
    const newRefreshTokenArray = foundUser.refreshToken.filter((rt) => rt !== refreshToken);
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            foundUser.refreshToken = [...newRefreshTokenArray];
            yield foundUser.save();
        }
        if (err || foundUser._id.toString() !== decoded.id)
            return res.sendStatus(403);
        //Valid Refresh Token
        const accessToken = jsonwebtoken_1.default.sign({
            id: foundUser._id,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
        const newRefreshToken = jsonwebtoken_1.default.sign({ id: foundUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        yield foundUser.save();
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
            user: foundUser.username,
            email: foundUser.email,
            token: accessToken,
        });
    }));
});
exports.handleRefreshToken = handleRefreshToken;
//# sourceMappingURL=refreshController.js.map