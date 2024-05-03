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
exports.handleLogout = exports.handleLogin = exports.handleRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../Model/User"));
const handleRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    if (!username || !email || !password)
        return res
            .status(400)
            .json({ message: "Please provide full credentials!" });
    const duplicate = yield User_1.default.findOne({ email }).exec();
    if (duplicate)
        return res.status(409).json({ message: "Email is already taken." });
    try {
        const hashedPwd = yield bcrypt_1.default.hash(password, 10);
        yield User_1.default.create({
            email,
            username,
            password: hashedPwd,
        });
        res.status(201).json({ message: `New User ${username} created!` });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.handleRegister = handleRegister;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    const { email, password } = req.body;
    if (!email || !password)
        return res
            .status(400)
            .json({ message: "Please provide full credentials!" });
    const foundUser = yield User_1.default.findOne({ email }).exec();
    if (!foundUser)
        return res.status(401).json({ message: "Wrong Email / Password." });
    const match = yield bcrypt_1.default.compare(password, foundUser.password);
    if (match) {
        const accessToken = jsonwebtoken_1.default.sign({
            id: foundUser._id,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
        const newRefreshToken = jsonwebtoken_1.default.sign({ id: foundUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
        const newRefreshTokenArray = !(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)
            ? foundUser.refreshToken
            : foundUser.refreshToken.filter((token) => token !== cookies.jwt);
        if (cookies.jwt)
            res.clearCookie("jwt", { httpOnly: true, secure: true });
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        yield foundUser.save();
        res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            user: foundUser.username,
            email: foundUser.email,
            token: accessToken,
        });
    }
    else {
        res.status(401).json({ message: "Wrong Username / Password." });
    }
});
exports.handleLogin = handleLogin;
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const foundUser = yield User_1.default.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, secure: true });
        return res.sendStatus(204);
    }
    foundUser.refreshToken = foundUser.refreshToken.filter((rt) => rt !== refreshToken);
    yield foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    res.sendStatus(204);
});
exports.handleLogout = handleLogout;
//# sourceMappingURL=authController.js.map