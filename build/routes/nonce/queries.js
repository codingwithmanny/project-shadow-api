"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.QUERY_NONCE = exports.CREATE_NONCE = void 0;
// Imports
// ========================================================
var client_1 = require("@prisma/client");
var errorHandlers_1 = require("../../utils/errorHandlers");
var dictionary_json_1 = __importDefault(require("../../utils/dictionary.json"));
var rand_token_1 = __importDefault(require("rand-token"));
var queries_1 = require("../forms/queries");
// Config
// ========================================================
var prisma = new client_1.PrismaClient();
// Queries
// ========================================================
/**
 *
 * @param payload
 * @returns
 */
var CREATE_NONCE = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var options, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, queries_1.QUERY_ORG_FORM)("".concat(payload.formId))];
            case 1: return [4 /*yield*/, (_a.sent()).data];
            case 2:
                if (!(_a.sent())) {
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORG_FORMS.ERROR.READ.NOT_FOUND);
                }
                options = {
                    data: {
                        orgFormId: "".concat(payload.formId),
                        nonce: rand_token_1.default.uid(64),
                    },
                };
                return [4 /*yield*/, prisma.nonce.create(options)];
            case 3:
                data = _a.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.CREATE_NONCE = CREATE_NONCE;
/**
 *
 * @param id
 * @returns
 */
var QUERY_NONCE = function (id, nonce) { return __awaiter(void 0, void 0, void 0, function () {
    var options, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {};
                if (id) {
                    options.where = __assign(__assign({}, options.where), { id: id });
                }
                if (nonce) {
                    options.where = __assign(__assign({}, options.where), { nonce: nonce });
                }
                return [4 /*yield*/, prisma.nonce.findFirst(options)];
            case 1:
                data = _a.sent();
                if (!data)
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.NONCE.ERROR.READ.NOT_FOUND);
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.QUERY_NONCE = QUERY_NONCE;
//# sourceMappingURL=queries.js.map