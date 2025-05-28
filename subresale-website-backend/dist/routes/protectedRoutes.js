"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const userRoute_1 = tslib_1.__importDefault(require("./userRoute"));
router.use('/users', authMiddleware_1.authMiddleware, userRoute_1.default);
exports.default = router;
