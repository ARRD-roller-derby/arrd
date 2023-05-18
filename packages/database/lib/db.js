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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NjordDb = exports.MongoDb = exports.MONGO_URI_NJORD = exports.MONGO_URI = void 0;
const mongoose_1 = require("mongoose");
exports.MONGO_URI = process.env.MONGO_URI || '';
exports.MONGO_URI_NJORD = process.env.MONGO_URI_NJORD || '';
function MongoDb() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongoose_1.connection)
            yield mongoose_1.connection.close();
        yield (0, mongoose_1.connect)(exports.MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        console.log('🚀 Base MIDGARD connectée');
    });
}
exports.MongoDb = MongoDb;
function NjordDb() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mongoose_1.connection)
            yield mongoose_1.connection.close();
        yield (0, mongoose_1.connect)(exports.MONGO_URI_NJORD, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('🚀 Base NJORD connectée');
    });
}
exports.NjordDb = NjordDb;
