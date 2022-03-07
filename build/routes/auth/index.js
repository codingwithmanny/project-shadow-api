"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
// ========================================================
var express_1 = require("express");
// import ListUsers from './list';
var signin_1 = __importDefault(require("./signin"));
var me_1 = __importDefault(require("./me"));
// import UpdateUser from './update';
// import DeleteUser from './delete';
// Config
// ========================================================
var router = (0, express_1.Router)();
// Routes
// ========================================================
// router.use(ListUsers);
router.use(signin_1.default);
router.use(me_1.default);
// router.use(UpdateUser);
// router.use(DeleteUser);
// Exports
// ========================================================
exports.default = router;
//# sourceMappingURL=index.js.map