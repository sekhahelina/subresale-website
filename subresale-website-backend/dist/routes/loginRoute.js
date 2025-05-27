"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const loginController_1 = require("../controllers/loginController");
const router = express_1.default.Router();
router.post('/', loginController_1.login);
exports.default = router;
