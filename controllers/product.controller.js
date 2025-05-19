
import prisma from "../lib/prisma.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {productSchema,productIdSchema} from "../validators/product.validator.js";


// create a new product
export const createProduct = asyncHandler (async (req, res) => {

        // const { name, description, price, stock, image, categoryId } = req.body;
     const validatedProduct =   await productSchema.parse(req.body);
        const product = await prisma.product.create({
            data: {
                ...validatedProduct
            },
        });
        res.status(201).json(new ApiResponse(201,product, "Product created successfully"));
    
       
      
})
// get all products
export const getAllProducts = asyncHandler (async (req, res) => {

        const products = await prisma.product.findMany({
            where: { isDeleted: false },
        });
        res.status(200).json(new ApiResponse(200,products, "Products found successfully"));
  
       
        
})

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


export const updateProduct = asyncHandler (async (req, res) => {
    
        const { id } = productIdSchema.parse(req.params);

        const product = await prisma.product.findFirst({
            where: { id,isDeleted: false },
        });

        if (!product) {

            throw new ApiError(404, 'Product not found');
        }

        // const { name, description, price, stock, image, categoryId } = req.body;
        const validatedProduct = await productSchema.partial().parse(req.body);
            
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: validatedProduct,
        });
        res.status(200).json(new ApiResponse(200,updatedProduct, "Product updated successfully"));
     
}
)


// delete a product
export const deleteProduct = asyncHandler ( async (req, res) => {
    
        const { id } =  productIdSchema.parse(req.params);

        const product = await prisma.product.findFirst({
            where: { id,isDeleted: false },
        });

        if (!product) {
            throw new ApiError(404, 'Product not found');
            // return res.status(404).json({ message: 'Product not found' });
        }
        const deleteProduct = await prisma.product.update({
            where: { id },
            data: { isDeleted: true },
        });
        
        res.status(200).json(new ApiResponse(200,deleteProduct, "Product deleted successfully"));
       
}
)

// search product by name
export const searchProductByName = asyncHandler(async (req, res) => {
    
        const { name } = req.query;
        const products = await prisma.product.findMany({
            where: { name: 
                { contains: name,
                  mode: 'insensitive',
                 },
                 isDeleted: false },
                 take: 10,
                 orderBy: { updatedAt: 'desc' },

        });
        res.status(200).json(new ApiResponse(200,products, "Products found successfully"));
     

   
    
})