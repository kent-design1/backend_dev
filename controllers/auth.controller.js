import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../env.js";


export const signUp = async(req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email:email});

        if(existingUser){
            const error = new Error('User already exist');
            error.status = 409;
            throw error;
        }
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{name, email, password: hashPassword}], {session});
        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: 'User successfully created sucessfully',
            data: {
                token,
                user: newUser[0]
            }})
    }
    catch(error){
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = async(req,res,next)=>{
    try{
    const {email, password} = req.body;

    const existingUser = await User.findOne({email})

        if(!existingUser){
            const error = new Error('User does not exist');
            error.status = 404;
            throw error;
        }
        const ispasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!ispasswordValid){
            const error = new Error('User password is incorrect');
            error.status = 401;
            throw error;}

        const token = jwt.sign({userId: existingUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: 'User successfully signed-In',
            data: {
                token,
                user: existingUser
            }
        })
    }
    catch(error){
        next(error)
    }
}

export const signOut = async(req,res,next)=>{

}
