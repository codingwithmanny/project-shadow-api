"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// ========================================================
var express_1 = require("express");
var auth_1 = __importDefault(require("./auth"));
var users_1 = __importDefault(require("./users"));
var orgs_1 = __importDefault(require("./orgs"));
var members_1 = __importDefault(require("./members"));
var hooks_1 = __importDefault(require("./hooks"));
var forms_1 = __importDefault(require("./forms"));
var test_1 = __importDefault(require("./test"));
var nonce_1 = __importDefault(require("./nonce"));
var submissions_1 = __importDefault(require("./submissions"));
var verify_1 = __importDefault(require("./verify"));
// Config
// ========================================================
var router = (0, express_1.Router)();
// Routes
// ========================================================
router.use('/auth', auth_1.default);
router.use('/users', users_1.default);
router.use('/orgs', orgs_1.default);
router.use('/orgs', members_1.default);
router.use('/orgs', hooks_1.default);
router.use('/orgs', forms_1.default);
router.use('/test', test_1.default);
router.use('/nonce', nonce_1.default);
router.use('/submissions', submissions_1.default);
router.use('/verify', verify_1.default);
// Exports
// ========================================================
exports.default = router;
//# sourceMappingURL=index.js.map