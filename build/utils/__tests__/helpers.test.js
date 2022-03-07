"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// ========================================================
var helpers_1 = require("../helpers");
// Mocks
// ========================================================
// Tests
// ========================================================
/**
 * Validates successful response message formatting
 */
test("test - buildSuccessResponse - { hello: 'there' }", function () {
    // Setup
    var data = { hello: 'there' };
    // Init
    var result = (0, helpers_1.buildSuccessResponse)(data);
    // Expectations
    expect(result.success).toBeTruthy();
    expect(result.data).toBe(data);
    expect(result.pagination).toBeUndefined();
});
/**
 * Validates successful response message formatting with pagination
 */
test("test - buildSuccessResponse - { hello: 'there' }, pagination { limit: 1, offset: 2, total: 3 }", function () {
    // Setup
    var data = { hello: 'there' };
    var pagination = { limit: 1, offset: 2, total: 3 };
    // Init
    var result = (0, helpers_1.buildSuccessResponse)(data, pagination);
    // Expectations
    expect(result.success).toBeTruthy();
    expect(result.data).toBe(data);
    expect(result.pagination).toBe(pagination);
});
/**
 * Validates successful response message formatting
 */
test("test - buildErrorResponse - { hello: 'there' }", function () {
    // Setup
    var data = { hello: 'there' };
    // Init
    var result = (0, helpers_1.buildErrorResponse)(data);
    // Expectations
    expect(result.success).toBeFalsy();
    expect(result.errors).toBe(data);
});
//# sourceMappingURL=helpers.test.js.map