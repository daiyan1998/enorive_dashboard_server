import prisma from "../lib/prisma.js";
import {productSchema,productIdSchema} from "../validators/product.validator.js";


// create a new product
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
// get all products
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

// get a single product by ID
// export const getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await prisma.product.findUnique({
//             where: { 
//                 id,
//                 isDeleted: false
//              },
//         });
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json(product);
//     } catch (err) {
//         console.error('Error fetching product:', err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// }

// update a product

export const upadeteProduct = async (req, res) => {
    try {
        const { id } = productIdSchema.parse(req.params);

        const product = await prisma.product.findFirst({
            where: { id,isDeleted: false },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, description, price, stock, image, categoryId } = req.body;
        const validatedProduct = await productSchema.partial().parse({ name, description, price,
            stock, image, categoryId });
            
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: validatedProduct,
        });
        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct,
          });
          } catch (err) {
        if (err.name === 'ZodError') {
          return res.status(400).json({ message: 'Validation failed', errors: err.errors });
        }
    
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Something went wrong' });
      }
}



// delete a product
export const deleteProduct = async (req, res) => {
    try {



        const { id } =  productIdSchema.parse(req.params);

        const product = await prisma.product.findFirst({
            where: { id,isDeleted: false },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const deleteProduct = await prisma.product.update({
            where: { id },
            data: { isDeleted: true },
        });
        
        res.status(200).json({
            message: 'Product deleted successfully',
            product: deleteProduct,
        });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}