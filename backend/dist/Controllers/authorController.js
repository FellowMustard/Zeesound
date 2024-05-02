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
exports.handleCreateAuthor = exports.handleSearchAuthor = void 0;
const Author_1 = __importDefault(require("../Model/Author"));
const handleSearchAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const result = yield Author_1.default.find({
            name: { $regex: name, $options: "i" },
        }).exec();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.handleSearchAuthor = handleSearchAuthor;
const handleCreateAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, country, countryFlag, pic } = req.body;
    if (!name || !country || !countryFlag || !pic)
        return res
            .status(400)
            .json({ message: "Please provide full credentials!" });
    const duplicate = yield Author_1.default.findOne({
        name: { $regex: new RegExp(name, "i") },
    }).exec();
    if (duplicate)
        return res.status(409).json({ message: "Author is Already Exist." });
    try {
        const author = yield Author_1.default.create({
            name,
            country,
            countryFlag,
            pic,
        });
        res
            .status(201)
            .json({ message: `Author ${author.name} successfully created` });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.handleCreateAuthor = handleCreateAuthor;
//# sourceMappingURL=authorController.js.map