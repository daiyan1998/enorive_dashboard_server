import prisma from "../lib/prisma.js";
import productSchema from "../validators/product.validator.js";


// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, image, categoryId } = req.body;
     const validatedProduct =   await productSchema.parse({ name, description, price,
         stock, image, categoryId });
        const product = await prisma.product.create({
            data: {
                validatedProduct
            },
        });
        res.status(201).json(product);
    }  catch (err) {
        if (err.name === 'ZodError') {
          return res.status(400).json({ message: 'Validation failed', errors: err.errors });
        }
    
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Something went wrong' });
      }
};
// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            where: { isDeleted: false },
        });
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }           
}