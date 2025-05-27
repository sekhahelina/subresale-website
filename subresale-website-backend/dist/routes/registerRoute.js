"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const registerController_1 = require("../controllers/registerController");
const router = express_1.default.Router();
router.post('/', registerController_1.register);
exports.default = router;
