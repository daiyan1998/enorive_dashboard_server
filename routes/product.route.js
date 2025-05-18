import express from "express";
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    searchProductByName
} from "../controllers/product.controller.js";       


const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", searchProductByName);
router.post("/create", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;