import { Router } from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import sendEmail from '../utils/sendEmail.js';

const router=Router();

router.route('/register').post(authController.signup_post);
router.route('/login').post(authController.login_post);
router.route('/profile').get(
    authMiddleware.requireAuth,
    authController.currentUser
);
router.route('/protected').get(authMiddleware.requireAuth,(req,res)=>{
    res.status(200).json({
        message:'You are authenticated!',
        userId:req.userId
    })
})
router.route('/test-error').get((req, res, next) => {
    next(new Error('This is a test error'));
});

router.route('/logout').post(authController.logout);

router.route('/test-email').get(async(req,res)=>{
    try{
        await sendEmail(
            process.env.EMAIL_USER,
            'Auth Security Lab Test'
        );
        res.status(200).json({
            message:'Test email sent successfully'
        });
    } catch(err){
        console.error(err);
        res.status(500).json({
            message:'Failed to send email'
        });
    }
})

router.route('/verify-email').get(authController.verifyEmail);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password').post(authController.resetPassword);
export default router;