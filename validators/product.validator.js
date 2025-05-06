import z from "zod";

const productSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10),
    price: z.number().min(1).positive(),
    stock: z.number().int().positive(),
    image: z.string().url(),
    categoryId: z.string().uuid(),    
})

export default productSchema
