import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import productRoutes from "./routes/product.route.js"
import categoryRoutes from "./routes/category.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.send('Inventory API is running!');
});

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
