import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { type } from 'os';
import { timeStamp } from 'console';

const userSchema=new Schema({

    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please enter a valid email']
    },

    password:{
        type:String,
        required:[true,'Please enter a Password'],
        minlength:[6,'Minimum password length is 6 characters']
    },

    fullName:{
        type:String,
        required:[true,'Please enter the Full Name']
    },

    emailVerified:{
        type:Boolean,
        default:false,
    },

    emailVerificationToken:{
        type:String,
    },

    lastLogin:{
        type:Date,
    },

    emailVerificationExpires:{
        type:Date,
    },

    passwordResetToken:{
        type:String,
    },

    passwordResetExpires:{
        type:Date,
    }

}, {
    timestamps:true
});

//fire a function to hash password
userSchema.pre('save',async function () {
    if(!this.isModified('password')){
        return ;
    }
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    ;
});

//static method to login user

userSchema.statics.login=async function (email,password) {
    const user=await this.findOne({email});
    if(user){
        const auth=await bcrypt.compare(password,user.password)
        if(auth){

            if(!user.emailVerified){
                throw Error('email not verified');
            }
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User=mongoose.model('user',userSchema);

export default User;
