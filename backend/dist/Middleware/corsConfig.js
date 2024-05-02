"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const whitelistLink = process.env.NODE_ENV === "dev"
    ? [process.env.LOCAL_BE_URL, process.env.LOCAL_FE_URL]
    : [process.env.PROD_BE_URL, process.env.PROD_FE_URL];
exports.corsConfig = {
    origin: (origin, callback) => {
        if (!origin || whitelistLink.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
};
//# sourceMappingURL=corsConfig.js.map