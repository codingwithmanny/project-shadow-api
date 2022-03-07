"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// Imports
// ========================================================
require("express-async-errors");
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var routes_1 = __importDefault(require("./routes"));
var helpers_1 = require("./utils/helpers");
var client_1 = require("@prisma/client");
var supabase_js_1 = require("@supabase/supabase-js");
var SUPABASE_URL = 'https://uwcypckicqfkheotlxxt.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y3lwY2tpY3Fma2hlb3RseHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYxMzUzNzcsImV4cCI6MTk2MTcxMTM3N30.opR7SkaWAVJqchxJL8xIRJ4Oj2f0h-pEzT3o20gtPpk';
var client = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_ANON_KEY);
exports.client = client;
// ENV VARS
// ========================================================
dotenv_1.default.config();
var NODE_ENV = process.env.NODE_ENV || 'development';
var VERSION = process.env.VERSION || 'unknown';
// Init
// ========================================================
var app = (0, express_1.default)();
// Middlewares
// ========================================================
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// Endpoints / Routes
// ========================================================
/**
 *
 */
app.get('/', function (_req, res) {
    return res.send({ version: VERSION, environment: NODE_ENV });
});
/**
 *
 */
app.get('/healthz', function (_req, res) { return res.send({ status: 'ok' }); });
/**
 *
 */
app.use('/api', routes_1.default);
// Error Handler
// ========================================================
app.use(function (error, _req, res, next) {
    var _a, _b, _c;
    if (['NotFound', 'BadRequest', 'Forbidden'].includes(error === null || error === void 0 ? void 0 : error.name)) {
        return res
            .status((_a = error === null || error === void 0 ? void 0 : error.httpStatusCode) !== null && _a !== void 0 ? _a : 400)
            .json((0, helpers_1.buildErrorResponse)({ message: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Unknown error.' }));
    }
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError ||
        error instanceof client_1.Prisma.PrismaClientValidationError) {
        return res.status(400).json((0, helpers_1.buildErrorResponse)({
            message: (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : 'Unknown database error.',
        }));
    }
    next(error);
});
// Exprots
// ========================================================
exports.default = app;
//# sourceMappingURL=index.js.map