import prisma from "../config/db.js";

export const createProduct = async (req, res, next) => {
    try {
        const {name, price, quantity, category_id} = req.body;

         if (!name?.trim()) {
            return res.status(400).json({ success: false, message: 'Name is required' })
        }

        if (quantity < 0 ){
            return res.status(400).json({ success: false, message: 'Quantity Cannot be negative' })
        }

        if(price === undefined ){
            return res.status(400).json({success: false, message: 'Price is required'});

        }
        if (price <= 0 ){
            return res.status(400).json({ success: false, message: 'Price must be greater than 0' })
        }
        const product = await prisma.product.create({
           data:{
                name: name.trim(), 
                price, 
                quantity, 
                user_id: req.user.id,
                category_id: category_id !== undefined ? parseInt(category_id) : undefined
           } 
        });

        res.status(201).json({ success: true, data: product});
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({where: {user_id: req.user.id}, orderBy: { id: 'asc'}});

        res.status(200).json({ success: true, count: products.length, data: products });

    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
            where: {id: parseInt(req.params.id)}});

        if(!product){
            return res.status(404).json({success: false, message: 'Product not found'});
        }

        if(product.user_id !== req.user.id){
            return res.status(403).json({success: false, message: 'Not authorized to access this product'});
        }

        res.status(200).json({success: true, data: product});
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        
        const {name, price, quantity} = req.body;

        if (!name?.trim()) {
            return res.status(400).json({ success: false, message: 'Name is required' })
        }

        if (quantity < 0 ){
            return res.status(400).json({ success: false, message: 'Quantity Cannot be negative' })
        }

        if (price <= 0 ){
            return res.status(400).json({ success: false, message: 'Price must be greater than 0' })
        }
        const product = await prisma.product.findUnique({where: {id: parseInt(req.params.id)}});

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' })
        }

        if(product.user_id !== req.user.id){
            return res.status(403).json({success: false, message: 'Not authorized to access this product'});
        }

        const dataToUpdate = { name: name.trim() };
        if(price !== undefined ) dataToUpdate.price = price;
        if(quantity !== undefined ) dataToUpdate.quantity = quantity;

        const updatedProduct = await prisma.product.update({
            where: {id: parseInt(req.params.id)},
            data: dataToUpdate
        });
        
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({where: {id: parseInt(req.params.id)}});

        if(!product){
            return res.status(404).json({success: false, message: 'Product not found'});
        }

        if(product.user_id !== req.user.id){
            return res.status(403).json({success: false, message: 'Not authorized'});
        }

        const deletedProduct = await prisma.product.delete({
            where: {id: parseInt(req.params.id)}});

        res.status(200).json({success: true, data: deletedProduct});
    } catch (error) {
        next(error);
    }
};

