"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
//import userRoute from './userRoute';
//import userCoursesRoute from './userCoursesRoute';
//import certificateRoute from './certificateRoute';
//import activeCourseProgramRoute from './activeCourseProgramRoute';
//import { authMiddleware } from '../middleware/authMiddleware';
const router = express_1.default.Router();
/*router.use('/users', authMiddleware, userRoute);
router.use('/users-courses', authMiddleware, userCoursesRoute);
router.use('/certificates', authMiddleware, certificateRoute);
router.use('/active-course-program', authMiddleware, activeCourseProgramRoute);*/
exports.default = router;
