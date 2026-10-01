import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/category.controller.js";


const router = Router();

router.post('/', protect, createCategory);
router.get('/', protect, getCategories);
router.get('/:id', protect, getCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

export default router;