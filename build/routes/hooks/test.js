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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// ========================================================
var express_1 = require("express");
var helpers_1 = require("../../utils/helpers");
var queries_1 = require("./queries");
var authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
var undici_1 = require("undici");
// Config
// ========================================================
var router = (0, express_1.Router)();
var randomString = function (len) {
    if (len === void 0) { len = 1; }
    return new Array(len * 2)
        .fill(1000)
        .map(function (x) {
        return Math.ceil(x * Math.random())
            .toString(36)
            .charAt(0);
    })
        .filter(Boolean)
        .sort(function () { return Math.random() - 0.5; })
        .map(function (x, i) { return (i % 2 === 0 ? x.toUpperCase() : x); })
        .join('')
        .substr(0, len);
};
// Route
// ========================================================
var TestOrgHook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, dates, json, _a, statusCode_1, headers_1, body_1, jsonBody_1, query, _b, statusCode, headers, body, jsonBody;
    var _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                userId = (_d = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.sub) !== null && _d !== void 0 ? _d : undefined;
                return [4 /*yield*/, (0, queries_1.QUERY_ORG_HOOK)(req.params.id, userId)];
            case 1:
                data = (_f.sent()).data;
                dates = [null, "".concat(new Date())];
                json = {
                    name: 'Test Name',
                    method: ((_e = data === null || data === void 0 ? void 0 : data.method) !== null && _e !== void 0 ? _e : 'get').toLocaleUpperCase(),
                    walletAddress: "0x".concat(randomString(40)),
                    validated: dates[Math.floor(Math.random() * 2)],
                };
                if (!(data.method === 'post')) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, undici_1.request)("".concat(data.url), {
                        method: json.method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(json),
                    })];
            case 2:
                _a = _f.sent(), statusCode_1 = _a.statusCode, headers_1 = _a.headers, body_1 = _a.body;
                return [4 /*yield*/, body_1.json()];
            case 3:
                jsonBody_1 = _f.sent();
                return [2 /*return*/, res.json((0, helpers_1.buildSuccessResponse)({
                        statusCode: statusCode_1,
                        headers: headers_1,
                        body: jsonBody_1,
                    }))];
            case 4:
                query = Object.keys(json)
                    .map(function (attr) {
                    return "".concat(attr, "=").concat(json[attr]);
                })
                    .join('&');
                return [4 /*yield*/, (0, undici_1.request)("".concat(data.url, "?").concat(query), {
                        method: json.method,
                    })];
            case 5:
                _b = _f.sent(), statusCode = _b.statusCode, headers = _b.headers, body = _b.body;
                return [4 /*yield*/, body.json()];
            case 6:
                jsonBody = _f.sent();
                return [2 /*return*/, res.json((0, helpers_1.buildSuccessResponse)({
                        statusCode: statusCode,
                        headers: headers,
                        body: jsonBody,
                    }))];
        }
    });
}); };
// Middlewares
// ========================================================
router.get('/:orgId/hooks/:id/test', authMiddleware_1.default, TestOrgHook);
// Exports
// ========================================================
exports.default = router;
//# sourceMappingURL=test.js.map