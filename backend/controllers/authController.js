import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';


const maxAge=3*34*60*60;
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:maxAge
    })
}

const signup_post =async (req,res,next)=>{    
    const {fullName,email,password}=req.body;
    

    try{
        const user=await User.create({email,password,fullName});
    
        const token=createToken(user._id)

        const verificationToken=crypto.randomBytes(32).toString('hex');
       

        user.emailVerificationToken=verificationToken;
        user.emailVerificationExpires=Date.now()+24*60*60*1000;

        await user.save();

        const verificationLink=`http://localhost:5173/verify-email?token=${verificationToken}&email=${user.email}`;

        await sendEmail(
            user.email,
            'Welcome to auth Lab',
            `Hi, ${user.fullName}
            Please verify your email by clicking this link:
            ${verificationLink}
            This Link expires in 24 hours.
            `
        )


        res.cookie('jwt',token,{maxAge:maxAge*1000,httpOnly:true});
        res.status(201).json({user:user._id});
    }
    
    catch(err){
        // const errors=handleErrors(err);
        // res.status(400).json({errors});
        next(err);
    }
}

//LOGIN
const login_post=async(req,res,next)=>{
    const {email,password}=req.body;
    
    try{
    const user =await User.login(email,password);
    
    user.lastLogin=new Date();
    await user.save();

    const token=createToken(user._id)
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
    res.status(200).json({user:user,token:token})
    }
    catch(err){
        // const error=handleErrors(err);
        // res.status(400).json({error})
        next(err);
    }
}


const logout=(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        maxAge:1
    });
    res.status(200).json({
        message:'logged out successfully'
    });
};

//GET CURRENT USER FROM DATABASE
const currentUser=async (req,res)=>{
        try{
            console.log('User ID from token:', req.userId);
            const user=await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(404).json({
                message:'User not found'
            });
        }
        res.status(200).json(
            user
        );
        } catch(err){
            res.status(500).json({
                message:'Server error'
            })
        }

    };

    // VERIFY EMAIL OF THE USER 
   const verifyEmail = async (req, res, next) => {
    try {
        console.log("VERIFY QUERY:", req.query);

        const { email, token } = req.query;

        if (!email || !token) {
            return res.status(400).json({
                message: 'Invalid verification link'
            });
        }

        const user = await User.findOne({
            email,
            emailVerificationToken: token
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid verification link'
            });
        }

        if (user.emailVerified) {
            return res.status(200).json({
                message: 'Email already verified'
            });
        }

        if (user.emailVerificationExpires < Date.now()) {
            return res.status(400).json({
                message: 'Verification link has expired'
            });
        }

        user.emailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;

        await user.save();

        res.status(200).json({
            message: 'Email verified successfully'
        });

    } catch (err) {
        next(err);
    }
};

    //FORGOT PASSWORD
    const forgotPassword=async(req,res,next)=>{
        const {email}=req.body;
        try{
            const user=await User.findOne({email});

            if(!user){
                return res.status(200).json({
                    message:'If that email exists,a password reset link has been sent'
                });
            }
            const resetToken=crypto.randomBytes(32).toString('hex');

            user.passwordResetToken=resetToken;
            user.passwordResetExpires=Date.now()+15*60*1000;
            
            await user.save();

            const resetLink=`http://localhost:5173/reset-password?token=${resetToken}&email=${user.email}`;

            await sendEmail(
                user.email,
                'Reset your password',
                `Hi,${user.fullName}
                We received a request to reset your password.

                Click the link below to choose a new password:
                ${resetLink}
                This link will expire in 15 minutes.

                If you did not request this,you can safely ignore this email.
                ` 
                );

                return res.status(200).json({
                    message:'If that email exists,a password reset link has been sent'
                })
            }

        catch(err){
            next(err);
        }
    }

    //RESET PASSWORD
    const resetPassword=async(req,res,next)=>{
        const {email,token,password}=req.body;

        try{
            const user=await User.findOne({
                email,
                passwordResetToken:token
            });

            if(!user){
                return res.status(400).json({
                    message:'Invalid or expired reset link'
                });
            }

            if(user.passwordResetExpires<Date.now()){
                return res.status(400).json({
                    message:'Invalid or expired reset link'
                });
            }

            user.password=password;
            user.passwordResetToken=undefined;
            user.passwordResetExpires=undefined;

            await user.save();

            return res.status(200).json({
                message:'Password reset successfully'
            });
        }

        catch(err){
            next(err);
        }
    }

export default{
    signup_post,
    login_post,
    currentUser,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
}