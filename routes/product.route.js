import  { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createProduct, getProducts } from "../controllers/product.controller.js";


const router = Router();

router.post('/', protect, createProduct);
router.get('/', protect, getProducts);

export default router;

