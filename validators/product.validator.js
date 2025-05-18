import z from "zod";

//product zod schema
export  const productSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10),
    regularPrice: z.number().min(1).positive(),
    salePrice: z.number().min(1).positive(),
    stock: z.number().int().positive(),
    imageUrl: z.string().url(),
    categoryId: z.string().uuid(),    
})




export const productIdSchema = z.object({
    id: z.string().uuid({ message: 'Invalid product ID format' }),
  });

