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
exports.DELETE_ORG = exports.QUERY_ORG_BY_FORM_ID = exports.UPDATE_ORG = exports.CREATE_ORG = exports.QUERY_ORG = exports.QUERY_ORGS = void 0;
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
var QUERY_ORGS = function (_a) {
    var _b = _a.query, query = _b === void 0 ? null : _b, _c = _a.take, take = _c === void 0 ? 10 : _c, _d = _a.skip, skip = _d === void 0 ? 0 : _d, _e = _a.orderBy, orderBy = _e === void 0 ? 'id' : _e, _f = _a.sort, sort = _f === void 0 ? 'asc' : _f, include = _a.include, userId = _a.userId;
    return __awaiter(void 0, void 0, void 0, function () {
        var optionOrderBy, optionSort, options, _g, pagination, includes, data;
        var _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    optionOrderBy = ['id', 'name'].includes(orderBy) ? orderBy : 'id';
                    optionSort = ['asc', 'desc'].includes(sort) ? sort : 'asc';
                    options = {};
                    console.log({ userId: userId });
                    _g = userId;
                    if (!_g) return [3 /*break*/, 2];
                    return [4 /*yield*/, prisma.user.findFirst({
                            where: {
                                id: userId,
                            },
                        })];
                case 1:
                    _g = !(_k.sent());
                    _k.label = 2;
                case 2:
                    if (_g) {
                        throw new errorHandlers_1.NotFound(dictionary_json_1.default.USERS.ERROR.READ.NOT_FOUND);
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
                        };
                    }
                    if (userId) {
                        options.where = __assign(__assign({}, options.where), { AND: [
                                {
                                    UserOrg: {
                                        some: {
                                            userId: userId,
                                        },
                                    },
                                },
                            ] });
                    }
                    options.orderBy = (_h = {},
                        _h[optionOrderBy] = optionSort,
                        _h);
                    _j = {
                        query: query,
                        take: take,
                        skip: skip,
                        orderBy: optionOrderBy,
                        sort: optionSort
                    };
                    return [4 /*yield*/, prisma.organization.count(options)];
                case 3:
                    pagination = (_j.total = _k.sent(),
                        _j);
                    options.take = take;
                    options.skip = skip;
                    includes = include === null || include === void 0 ? void 0 : include.split(',');
                    if (includes === null || includes === void 0 ? void 0 : includes.includes('membersCount')) {
                        options.include = {
                            _count: {
                                select: {
                                    OrgMember: true,
                                },
                            },
                        };
                    }
                    return [4 /*yield*/, prisma.organization.findMany(options)];
                case 4:
                    data = _k.sent();
                    return [2 /*return*/, { data: data, pagination: pagination }];
            }
        });
    });
};
exports.QUERY_ORGS = QUERY_ORGS;
/**
 *
 * @param id
 */
var QUERY_ORG = function (id, userId) { return __awaiter(void 0, void 0, void 0, function () {
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
                    options.where = __assign(__assign({}, options.where), { UserOrg: {
                            some: {
                                userId: userId,
                            },
                        } });
                }
                return [4 /*yield*/, prisma.organization.findFirst(options)];
            case 1:
                data = _a.sent();
                if (!data)
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORGS.ERROR.READ.NOT_FOUND);
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.QUERY_ORG = QUERY_ORG;
/**
 *
 * @param id
 * @param data
 * @returns
 */
var CREATE_ORG = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var user, create, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log({ payload: payload });
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            id: payload.userId,
                        },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.USERS.ERROR.READ.NOT_FOUND);
                }
                create = {
                    name: payload.name,
                    apiKey: null,
                    secretKey: null,
                    public: true,
                };
                return [4 /*yield*/, prisma.organization.create({
                        data: create,
                    })];
            case 2:
                data = _a.sent();
                console.log({ data: data });
                console.log({ userId: user.id });
                console.log({ orgId: data.id });
                // Create relationship
                return [4 /*yield*/, prisma.userOrg.createMany({
                        data: [
                            {
                                userId: user.id,
                                orgId: data.id,
                                role: 'admin',
                            },
                        ],
                    })];
            case 3:
                // Create relationship
                _a.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.CREATE_ORG = CREATE_ORG;
/**
 *
 * @param id
 * @param data
 * @returns
 */
var UPDATE_ORG = function (id, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var update, data;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log({ payload: payload });
                return [4 /*yield*/, prisma.organization.findFirst({
                        where: {
                            id: id,
                        },
                    })];
            case 1:
                if (!(_b.sent())) {
                    throw new errorHandlers_1.NotFound(dictionary_json_1.default.ORGS.ERROR.UPDATE.NOT_FOUND);
                }
                update = {};
                if (payload === null || payload === void 0 ? void 0 : payload.name) {
                    update.name = payload.name;
                }
                if (payload === null || payload === void 0 ? void 0 : payload.public) {
                    update.public = payload.public;
                }
                if (((_a = Object.keys(payload)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    update.updatedAt = new Date();
                }
                return [4 /*yield*/, prisma.organization.update({
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
exports.UPDATE_ORG = UPDATE_ORG;
/**
 *
 * @param id
 */
var QUERY_ORG_BY_FORM_ID = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var options;
    return __generator(this, function (_a) {
        options = {
            where: {},
        };
        return [2 /*return*/];
    });
}); };
exports.QUERY_ORG_BY_FORM_ID = QUERY_ORG_BY_FORM_ID;
/**
 *
 * @param id
 */
var DELETE_ORG = function (id, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var options, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.QUERY_ORG)(id, userId)];
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
                return [4 /*yield*/, prisma.organization.delete(options)];
            case 3:
                data = _a.sent();
                return [2 /*return*/, { data: data }];
        }
    });
}); };
exports.DELETE_ORG = DELETE_ORG;
//# sourceMappingURL=queries.js.map