import prisma from "../lib/prisma.js";
import {categorySchema,categoryIdSchema} from "../validators/category.validator.js";


// create category
export const createCategory=async (req,res)=>{
    try {
        const validatedCategory =  categorySchema.parse(req.body);
        const {name}=validatedCategory
        const category=await prisma.category.findUnique({
            where:{name}
        })

        if (category) {
            return res.status(409).json({ message: "Category already exists" });
          }


        const createCategory = await prisma.category.create({
            data: {
                validatedCategory
            },
        });

        res.status(201).json({
            message: 'Category created successfully',
            category: createCategory,
        });

    } catch (err) {
        if (err.name === 'ZodError') {
          return res.status(400).json({ message: 'Validation failed', errors: err.errors });
        }
    
        console.error('Error creating category:', err);
        res.status(500).json({ message: 'Something went wrong' });
      } 
}

// get all categories
export const getAllCategories=async(req,res)=>{
    try {
        const categories=await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Something went wrong' });
      } 
}

// update category
export const updateCategory=async(req,res)=>{
    try {
        const {id}=categoryIdSchema.parse(req.params);
        const category=await prisma.category.findUnique({
            where:{id}
        })

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
          }

        const {name}=req.body;  
        const validatedCategory=await categorySchema.partial().parse({name})

        const updatedCategory=await prisma.category.update({
            where:{id},
            data:{validatedCategory}
        })
        res.status(200).json({
            message: 'Category updated successfully',
            category: updatedCategory,
        });
    } catch (err) {
        if (err.name === 'ZodError') {
          return res.status(400).json({ message: 'Validation failed', errors: err.errors });
        }
    
        console.error('Error updating category:', err);
        res.status(500).json({ message: 'Something went wrong' });
      } 
}

// delete category

export const deleteCategory=async(req,res)=>{
    try {
        const {id}=categoryIdSchema.parse(req.params);
        const category=await prisma.category.findUnique({
            where:{id}
        })

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
          }

        const deleteCategory=await prisma.category.update({
            where:{id}
        })
        res.status(200).json({
            message: 'Category deleted successfully',
            category: deleteCategory,
        });
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ message: 'Something went wrong' });
      } 
}       
        
