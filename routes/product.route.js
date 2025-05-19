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
router.patch("/:id", updateProduct);
router.post("/create", createProduct);
router.delete("/:id", deleteProduct);
// router.route("/:id").put(updateProduct).delete(deleteProduct);

export default router;