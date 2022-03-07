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
exports.DELETE_ORG_FORM = exports.UPDATE_ORG_FORM = exports.CREATE_ORG_FORM = exports.QUERY_ORG_FROM_API_KEY = exports.QUERY_ORG_FORM = exports.QUERY_ORG_FORMS = void 0;
// Imports
// ========================================================
var client_1 = require("@prisma/client");
var errorHandlers_1 = require("../../utils/errorHandlers");
var dictionary_json_1 = __importDefault(require("../../utils/dictionary.json"));
var queries_1 = require("../orgs/queries");
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
var QUERY_ORG_FORMS = function (_a) {
    var _b = _a.query, query = _b === void 0 ? null : _b, _c = _a.take, take = _c === void 0 ? 10 : _c, _d = _a.skip, skip = _d === void 0 ? 0 : _d, _e = _a.orderBy, orderBy = _e === void 0 ? 'id' : _e, _f = _a.sort, sort = _f === void 0 ? 'asc' : _f, orgId = _a.orgId, userId = _a.userId;
    return __awaiter(void 0, void 0, void 0, function () {
        var optionOrderBy, optionSort, options, pagination, data;
        var _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    optionOrderBy = ['id', 'name', 'enabled', 'createdAt'].includes(orderBy)
                        ? orderBy
                        : 'id';
                    optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
                    options = {};
                    return [4 /*yield*/, (0, queries_1.QUERY_ORG)("".concat(orgId), userId)];
                case 1: return [4 /*yield*/, (_j.sent()).data];
                case 2:
                    if (!(_j.sent())) {
                        throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORGS.ERROR.READ.NOT_FOUND);
                    }
                    if (query && userId) {
                        options.where = {
                            OR: [
                                {
                                    name: {
                                        contains: query,
                                        mode: 'insensitive',
                                    },
                                },
                            ],
                            AND: [
                                {
                                    Org: {
                                        UserOrg: {
                                            some: {
                                                userId: userId,
                                            },
                                        },
                                    },
                                },
                            ],
                        };
                    }
                    else if (query) {
                        options.where = {
                            OR: [
                                {
                                    name: {
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
                    return [4 /*yield*/, prisma.orgForm.count(options)];
                case 3:
                    pagination = (_h.total = _j.sent(),
                        _h);
                    options.take = take;
                    options.skip = skip;
                    return [4 /*yield*/, prisma.orgForm.findMany(options)];
                case 4:
                    data = _j.sent();
                    return [2 /*return*/, { data: data, pagination: pagination }];
            }
        });
    });
};
exports.QUERY_ORG_FORMS = QUERY_ORG_FORMS;
/**
 *
 * @param id
 * @param userId
 * @returns
 */
var QUERY_ORG_FORM = function (id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var options, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    where: {
                        id: id,
                    },
                };
                if (userId) {
                    options.where = __assign(__assign({}, options.where), { Org: {
                            UserOrg: {
                                some: {
                                    userId: userId,
                                },
                            },
                        } });
                }
                return [4 /*yield*/, prisma.orgForm.findFirst(options)];
            case 1:
                data = _a.sent();
                if (!data)
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORG_FORMS.ERROR.READ.NOT_FOUND);
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.QUERY_ORG_FORM = QUERY_ORG_FORM;
/**
 *
 * @param id
 * @param userId
 * @returns
 */
var QUERY_ORG_FROM_API_KEY = function (id, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var options, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    where: {
                        id: id,
                    },
                };
                if (apiKey) {
                    options.where = __assign(__assign({}, options.where), { Org: {
                            apiKey: apiKey,
                        } });
                }
                return [4 /*yield*/, prisma.orgForm.findFirst(options)];
            case 1:
                data = _a.sent();
                if (!data)
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORG_FORMS.ERROR.READ.NOT_FOUND);
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.QUERY_ORG_FROM_API_KEY = QUERY_ORG_FROM_API_KEY;
/**
 *
 * @param id
 * @param data
 * @returns
 */
var CREATE_ORG_FORM = function (payload, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var options, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, queries_1.QUERY_ORG)("".concat(payload.orgId), userId)];
            case 1: return [4 /*yield*/, (_a.sent()).data];
            case 2:
                if (!(_a.sent())) {
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORGS.ERROR.READ.NOT_FOUND);
                }
                options = {
                    data: payload,
                };
                if (payload.name) {
                    options.data = __assign(__assign({}, options.data), { name: payload.name });
                }
                return [4 /*yield*/, prisma.orgForm.create(options)];
            case 3:
                data = _a.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.CREATE_ORG_FORM = CREATE_ORG_FORM;
/**
 *
 * @param id
 * @param data
 * @returns
 */
var UPDATE_ORG_FORM = function (id, payload, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var options, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, queries_1.QUERY_ORG)("".concat(payload.orgId), userId)];
            case 1: return [4 /*yield*/, (_a.sent()).data];
            case 2:
                if (!(_a.sent())) {
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORGS.ERROR.READ.NOT_FOUND);
                }
                options = {
                    where: {
                        id: id,
                    },
                    data: {},
                };
                if (payload.name) {
                    options.data = __assign(__assign({}, options.data), { name: payload.name });
                }
                if (payload.enabled !== undefined || payload.enabled !== null) {
                    options.data = __assign(__assign({}, options.data), { enabled: payload.enabled });
                }
                return [4 /*yield*/, prisma.orgForm.update(options)];
            case 3:
                data = _a.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.UPDATE_ORG_FORM = UPDATE_ORG_FORM;
/**
 *
 * @param id
 */
var DELETE_ORG_FORM = function (id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var options, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.QUERY_ORG_FORM)(id, userId)];
            case 1: return [4 /*yield*/, (_a.sent()).data];
            case 2:
                if (!(_a.sent())) {
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORGS.ERROR.DELETE.NOT_FOUND);
                }
                options = {
                    where: {
                        id: id,
                    },
                };
                return [4 /*yield*/, prisma.orgForm.delete(options)];
            case 3:
                data = _a.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.DELETE_ORG_FORM = DELETE_ORG_FORM;
//# sourceMappingURL=queries.js.map