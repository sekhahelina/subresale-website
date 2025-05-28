import express from 'express';

import registerRoute from './registerRoute';
import loginRoute from './loginRoute';
import subscriptionRoute from './subscriptionsRoute';

const router = express.Router();

router.use('/sign-in', loginRoute);
router.use('/register', registerRoute);
router.use('/subscriptions', subscriptionRoute);

export default router;
