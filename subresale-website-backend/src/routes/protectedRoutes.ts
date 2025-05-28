import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

import userRoute from './userRoute';
import userSubscriptionRoute from './userSubscriptionRoute';

router.use('/users', authMiddleware, userRoute);
router.use('/userSubscriptions', authMiddleware, userSubscriptionRoute);

export default router;
