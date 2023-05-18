"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelModel = void 0;
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
    },
    city: String,
    country: String,
    address: String,
    image: String,
    pricePerNight: String,
    brand: String,
}, { timestamps: true });
exports.hotelModel = (0, mongoose_1.model)("session", sessionSchema);
