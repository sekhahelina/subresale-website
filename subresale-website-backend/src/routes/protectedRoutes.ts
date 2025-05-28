import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

import userRoute from './userRoute';

router.use('/users', authMiddleware, userRoute);

export default router;
