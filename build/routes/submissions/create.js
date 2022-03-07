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
// Imports
// ========================================================
var express_1 = require("express");
var helpers_1 = require("../../utils/helpers");
var validator_1 = __importDefault(require("../../middlewares/validator"));
var express_validator_1 = require("express-validator");
// import { CREATE_ORG_MEMBER } from './queries';
var queries_1 = require("../forms/queries");
var queries_2 = require("../nonce/queries");
// Config
// ========================================================
var router = (0, express_1.Router)();
// Route
// ========================================================
var CreateSubmisson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = req.body;
                // Validate form and apiKey
                return [4 /*yield*/, (0, queries_1.QUERY_ORG_FROM_API_KEY)(payload.formId, payload.apiKey)];
            case 1:
                // Validate form and apiKey
                _a.sent();
                // Validate nonce
                return [4 /*yield*/, (0, queries_2.QUERY_NONCE)(undefined, payload.nonce)];
            case 2:
                // Validate nonce
                _a.sent();
                // TODO: Validate signature
                // const { data } = await CREATE_ORG_MEMBER_WITH_FORM({
                //   formId: payload.formId,
                //   name: payload?.name ?? undefined,
                //   walletAddress: payload.walletAddress,
                //   signature: payload.signature,
                // });
                return [2 /*return*/, res.json((0, helpers_1.buildSuccessResponse)({ data: true }))];
        }
    });
}); };
// Middlewares
// ========================================================
router.post('/', (0, express_validator_1.body)('formId').isString(), (0, express_validator_1.body)('apiKey').isString(), (0, express_validator_1.body)('nonce').isString(), (0, express_validator_1.body)('name').optional(), (0, express_validator_1.body)('walletAddress').isString(), (0, express_validator_1.body)('signature').isString(), validator_1.default, CreateSubmisson);
// Exports
// ========================================================
exports.default = router;
// // Imports
// // ========================================================
// import { Router, Request, Response } from 'express';
// import { buildSuccessResponse } from '../../utils/helpers';
// import authMiddleware from '../../middlewares/authMiddleware';
// import Validator from '../../middlewares/validator';
// import { body } from 'express-validator';
// import { CREATE_ORG_MEMBER } from './queries';
// // Config
// // ========================================================
// const router = Router();
// // Route
// // ========================================================
// const CreateMember = async (req: Request, res: Response) => {
//   const userId = req?.user?.sub ?? undefined;
//   const { data } = await CREATE_ORG_MEMBER(
//     {
//       ...req.body,
//       orgId: req.params.id,
//     },
//     userId,
//   );
//   return res.json(buildSuccessResponse(data));
// };
// // Middlewares
// // ========================================================
// router.post(
//   '/:id/members',
//   authMiddleware,
//   body('name').optional(),
//   body('walletAddress').isString().isLength({ min: 3 }),
//   body('validated').optional(),
//   Validator,
//   CreateMember,
// );
// // Exports
// // ========================================================
// export default router;
//# sourceMappingURL=create.js.map