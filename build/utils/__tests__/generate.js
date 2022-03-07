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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNext = exports.buildResponse = exports.buildRequest = void 0;
/**
 *
 * @param overrides
 */
var buildRequest = function (overrides) {
    if (overrides === void 0) { overrides = {}; }
    var req = __assign({ body: null, query: null }, overrides);
    return req;
};
exports.buildRequest = buildRequest;
/**
 *
 * @param overrides
 */
var buildResponse = function (overrides) {
    if (overrides === void 0) { overrides = {}; }
    var res = __assign({ status: jest.fn(function () { return res; }).mockName('status'), send: jest.fn(function () { return res; }).mockName('send'), json: jest.fn(function () { return res; }).mockName('json') }, overrides);
    return res;
};
exports.buildResponse = buildResponse;
/**
 *
 * @param impl
 */
var buildNext = function (impl) {
    return jest.fn(impl).mockName('next');
};
exports.buildNext = buildNext;
//# sourceMappingURL=generate.js.map