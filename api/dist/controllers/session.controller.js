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
exports.sessions = void 0;
const api_1 = require("../api");
const appError_1 = __importDefault(require("../utils/appError"));
const sessions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sessions = yield (0, api_1.getSessions)();
        const { short_title, status } = req.query;
        if (short_title) {
            sessions = sessions.filter((el) => {
                return el.program.some((program) => {
                    return program.short_title === short_title;
                });
            });
        }
        if (status) {
            const statusOptions = ["OFFERING", "RUNNING", "OFFBOARDING"];
            if (!statusOptions.includes(status)) {
                return next(new appError_1.default(400, "invalid status provided"));
            }
            sessions = sessions.filter((session) => session.status === status);
        }
        if (status && short_title) {
            sessions = sessions.filter((el) => el.status === status &&
                el.program.some((program) => {
                    return program.short_title === short_title;
                }));
        }
        const sortInDesc = sessions.sort((objA, objB) => Number(new Date(objB.start_date)) - Number(new Date(objA.start_date)));
        res.status(200).json({
            success: true,
            message: "sessions fetched successfully",
            //   sessions,
            sessions: sortInDesc,
        });
        // return next(new AppError(400, "not found"));
    }
    catch (err) {
        if (err.code === "ENOTFOUND" && err.errno === -3008) {
            return next(new appError_1.default(500, "check your internet connection and try again"));
        }
        next(err);
    }
});
exports.sessions = sessions;
