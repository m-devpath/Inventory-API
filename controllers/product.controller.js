import prisma from "../config/db.js";

export const createProduct = async (req, res, next) => {
    try {
        const {name, price, quantity} = req.body;

        if(!name){
            return res.status(400).json({success: false, message: 'Name is required'});
        }

        if(!price){
            return res.status(400).json({success: false, message: 'Price is required'});

        }

        const product = await prisma.product.create({
           data:{
                name, 
                price, 
                quantity, 
                user_id: req.user.id
           } 
        });

        res.status(201).json({ success: true, data: product});
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({where: {user_id: req.user.id}});

        res.status(200).json({ success: true, count: products.length, data: products });

    } catch (error) {
        next(error);
    }
};