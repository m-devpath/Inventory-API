import prisma from "../config/db.js";

export const createCategory = async (req, res, next) => {
    try {
        const {name} = req.body;

        if(!name){
            return res.status(400).json({success: false, message: 'Name is required'});  
        }

        const category = await prisma.category.create({
            data:{
                name, 
                user_id: req.user.id
            }
        });

        res.status(201).json({success: true, data: category});
    } catch (error) {
        next(error);   
    }
};

export const getCategories = async (req, res, next) => {
   try {
    const category = await prisma.category.findMany({
        where: {user_id: req.user.id}
    });

    res.status(200).json({success: true, data: category});
   } catch (error) {
    next(error);
   }

};

export const getCategory = async (req, res, next) => {
    try {
        const category = await prisma.category.findUnique({
            where: {id: parseInt(req.params.id)}
        });

        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        if(category.user_id !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'Not Authorized to access this category'
            });
        }

        res.status(200).json({success: true, data: category})
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const category = await prisma.category.findUnique({
            where: {id: parseInt(req.params.id)}
        });

        if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        if(category.user_id !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'Not Authorized to access this category'
            });
        }

        const { name } = req.body;
        const dataToUpdate = {};
        if(name !== undefined) dataToUpdate.name = name;

        const updatedCategory = await prisma.category.update({
            where: {id: parseInt(req.params.id)},
            data: dataToUpdate
        });

        res.status(200).json({success: true, data: updatedCategory})
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const category = await prisma.category.findUnique({
            where: {id: parseInt(req.params.id)}
        });

          if(!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        if(category.user_id !== req.user.id){
            return res.status(403).json({
                success: false,
                message: 'Not Authorized to access this category'
            });
        }

        const deletedCategory = await prisma.category.delete({
            where: {id: parseInt(req.params.id)}});

        
        res.status(200).json({success: true, data: deletedCategory});
    } catch (error) {
        next(error);
    }
};
