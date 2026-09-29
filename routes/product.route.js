import  { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";


const router = Router();

router.post('/', protect, createProduct);
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct)


export default router;

