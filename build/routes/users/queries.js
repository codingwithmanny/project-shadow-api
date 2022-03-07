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
exports.DELETE_USER = exports.UPSERT_USER = exports.UPDATE_USER = exports.CREATE_USER = exports.QUERY_USER = exports.QUERY_USERS = void 0;
// Imports
// ========================================================
var client_1 = require("@prisma/client");
var errorHandlers_1 = require("../../utils/errorHandlers");
var dictionary_json_1 = __importDefault(require("../../utils/dictionary.json"));
// Config
// ========================================================
var prisma = new client_1.PrismaClient();
// Queries
// ========================================================
/**
 *
 * @param param0
 * @returns
 */
var QUERY_USERS = function (_a) {
    var _b = _a.query, query = _b === void 0 ? null : _b, _c = _a.take, take = _c === void 0 ? 10 : _c, _d = _a.skip, skip = _d === void 0 ? 0 : _d, _e = _a.orderBy, orderBy = _e === void 0 ? 'id' : _e, _f = _a.sort, sort = _f === void 0 ? 'asc' : _f;
    return __awaiter(void 0, void 0, void 0, function () {
        var optionOrderBy, optionSort, options, pagination, data;
        var _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    optionOrderBy = ['id', 'username', 'email'].includes(orderBy)
                        ? orderBy
                        : 'id';
                    optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
                    options = {};
                    if (query) {
                        options.where = {
                            OR: [
                                {
                                    username: {
                                        contains: query,
                                        mode: 'insensitive',
                                    },
                                },
                                {
                                    email: {
                                        contains: query,
                                        mode: 'insensitive',
                                    },
                                },
                            ],
                        };
                    }
                    options.orderBy = (_g = {},
                        _g[optionOrderBy] = optionSort,
                        _g);
                    _h = {
                        query: query,
                        take: take,
                        skip: skip,
                        orderBy: optionOrderBy,
                        sort: optionSort
                    };
                    return [4 /*yield*/, prisma.user.count(options)];
                case 1:
                    pagination = (_h.total = _j.sent(),
                        _h);
                    options.take = take;
                    options.skip = skip;
                    return [4 /*yield*/, prisma.user.findMany(options)];
                case 2:
                    data = _j.sent();
                    return [2 /*return*/, { data: data, pagination: pagination }];
            }
        });
    });
};
exports.QUERY_USERS = QUERY_USERS;
/**
 *
 * @param id
 */
var QUERY_USER = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findFirst({
                    where: {
                        id: id,
                    },
                })];
            case 1:
                data = _a.sent();
                if (!data)
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.USERS.ERROR.READ.NOT_FOUND);
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.QUERY_USER = QUERY_USER;
/**
 *
 * @param id
 * @param data
 * @returns
 */
var CREATE_USER = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var create, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log({ payload: payload });
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            email: payload.email,
                        },
                    })];
            case 1:
                if (_a.sent()) {
                    throw new errorHandlers_1.BadRequest(dictionary_json_1.default.USERS.ERROR.CREATE.DUPLICATE);
                }
                create = {
                    email: payload.email,
                    username: payload.username,
                };
                return [4 /*yield*/, prisma.user.create({
                        data: create,
                    })];
            case 2:
                data = _a.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.CREATE_USER = CREATE_USER;
/**
 *
 * @param id
 * @param data
 * @returns
 */
var UPDATE_USER = function (id, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var update, data;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log({ payload: payload });
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            id: id,
                        },
                    })];
            case 1:
                if (!(_b.sent()))
                    return [2 /*return*/, { data: null }];
                update = {};
                if (payload === null || payload === void 0 ? void 0 : payload.username) {
                    update.username = payload.username;
                }
                if (payload === null || payload === void 0 ? void 0 : payload.email) {
                    update.email = payload.email;
                }
                if (((_a = Object.keys(payload)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    update.updatedAt = new Date();
                }
                return [4 /*yield*/, prisma.user.update({
                        where: {
                            id: id,
                        },
                        data: update,
                    })];
            case 2:
                data = _b.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.UPDATE_USER = UPDATE_USER;
/**
 *
 * @param payload
 */
var UPSERT_USER = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var user, update, data_1, data;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, prisma.user.findFirst({
                    where: {
                        id: payload.id,
                    },
                })];
            case 1:
                user = _c.sent();
                update = {};
                if (payload === null || payload === void 0 ? void 0 : payload.email) {
                    update.email = payload.email;
                }
                if (payload === null || payload === void 0 ? void 0 : payload.username) {
                    update.username = payload.username;
                }
                if (((_a = Object.keys(payload)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    update.updatedAt = new Date();
                }
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            id: payload.id,
                            username: "".concat((_b = payload === null || payload === void 0 ? void 0 : payload.username) !== null && _b !== void 0 ? _b : payload === null || payload === void 0 ? void 0 : payload.email),
                            email: "".concat(payload === null || payload === void 0 ? void 0 : payload.email),
                        },
                    })];
            case 2:
                data_1 = _c.sent();
                return [2 /*return*/, { data: data_1 }];
            case 3: return [4 /*yield*/, prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: update,
                })];
            case 4:
                data = _c.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.UPSERT_USER = UPSERT_USER;
/**
 *
 * @param id
 */
var DELETE_USER = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findFirst({
                    where: {
                        id: id,
                    },
                })];
            case 1:
                if (!(_a.sent()))
                    return [2 /*return*/, { data: null }];
                return [4 /*yield*/, prisma.user.delete({
                        where: {
                            id: id,
                        },
                    })];
            case 2:
                data = _a.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.DELETE_USER = DELETE_USER;
//# sourceMappingURL=queries.js.map