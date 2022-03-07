"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// ========================================================
var index_1 = __importDefault(require("./index"));
var dotenv_1 = __importDefault(require("dotenv"));
// ENV VARS
// ========================================================
dotenv_1.default.config();
var PORT = parseInt(process.env.PORT, 10);
var NODE_ENV = process.env.NODE_ENV || 'development';
var VERSION = process.env.VERSION || 'unknown';
// Server
// ========================================================
index_1.default.listen(PORT, function () {
    return console.log("Listening on PORT ".concat(PORT, "\nEnvironment: ").concat(NODE_ENV, "\nVersion: ").concat(VERSION));
});
// Exports
// ========================================================
exports.default = index_1.default;
//# sourceMappingURL=server.js.map