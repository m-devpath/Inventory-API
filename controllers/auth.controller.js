import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../config/db.js";

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
};

export const register = async (req, res, next) => {
    try {
        const {name, email, password } = req.body;

        if(!name || !email || !password ){
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password'
            });
        }

        if(password.length < 6 ){
             return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'            
            });
        }

        const existingUser  = await prisma.user.findUnique({ where: {email} });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'            
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword}
        });

        const token = generateToken(user.id);

        res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            token, 
            data: {id: user.id, name: user.name, email: user.email}
        });


    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Invalid Email or Password'
            });
        }

        const user = await prisma.user.findUnique({ where: {email} });

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid Email or Password'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid Email or Password'
            });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            message: 'User Login Successfully',
            token, 
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (error) {
        next(error);
    }
};