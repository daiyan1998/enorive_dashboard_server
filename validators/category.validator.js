import z from "zod";

  
 // category zod schema
 export const categorySchema = z.object({
    name: z.string().min(3).max(50),
})

export const categoryIdSchema = z.object({
    id: z.string().uuid({ message: 'Invalid category ID format' }),
  });