import express from 'express';
import subscriptionRoute from './subscriptionsRoute';
//import reviewRoute from './reviewRoute';
import registerRoute from './registerRoute';
/*import introRoute from './introRoute';
import courseRoute from './courseRoute';
import tutorRoute from './tutorRoute';
import courseProgramRoute from './courseProgramRoute';*/
import loginRoute from './loginRoute';

const router = express.Router();

//router.use('/intro', introRoute);
//router.use('/courses', courseRoute);
//router.use('/tutors', tutorRoute);
//router.use('/course-program', courseProgramRoute);
router.use('/sign-in', loginRoute);
router.use('/register', registerRoute);
//router.use('/reviews', reviewRoute);
router.use('/subscriptions', subscriptionRoute);

export default router;
