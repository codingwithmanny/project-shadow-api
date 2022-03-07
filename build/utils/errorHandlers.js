"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = exports.Forbidden = exports.BadRequest = void 0;
// Error Handlers
// ========================================================
/**
 * Bad Request
 */
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(message) {
        var _this = _super.call(this, message) || this;
        _this.httpStatusCode = 400;
        _this.name = 'BadRequest';
        return _this;
    }
    return BadRequest;
}(Error));
exports.BadRequest = BadRequest;
/**
 * Forbidden Request
 */
var Forbidden = /** @class */ (function (_super) {
    __extends(Forbidden, _super);
    function Forbidden(message) {
        var _this = _super.call(this, message) || this;
        _this.httpStatusCode = 403;
        _this.name = 'Forbidden';
        return _this;
    }
    return Forbidden;
}(Error));
exports.Forbidden = Forbidden;
/**
 * NotFound Request
 */
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(message) {
        var _this = _super.call(this, message) || this;
        _this.httpStatusCode = 404;
        _this.name = 'NotFound';
        return _this;
    }
    return NotFound;
}(Error));
exports.NotFound = NotFound;
//# sourceMappingURL=errorHandlers.js.map