"use strict";
// Imports
// ========================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildErrorResponse = exports.buildSuccessResponse = void 0;
// Helper Functions
// ========================================================
/**
 * Create success response object
 * @param data Any object
 * @returns {ResponseFormat}
 */
var buildSuccessResponse = function (data, pagination) {
    var response = {
        success: true,
        data: data,
    };
    if (pagination) {
        response.pagination = pagination;
    }
    return response;
};
exports.buildSuccessResponse = buildSuccessResponse;
/**
 * Create errors response object
 * @param data Any object
 * @returns {ResponseFormat}
 */
var buildErrorResponse = function (errors) {
    return {
        success: false,
        errors: errors,
    };
};
exports.buildErrorResponse = buildErrorResponse;
//# sourceMappingURL=helpers.js.map