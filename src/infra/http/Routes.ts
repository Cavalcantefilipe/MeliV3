import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController.js";
import { SellerController } from "./controllers/SellerController.js";
import { ProductController } from "./controllers/ProductController.js";
import { LogsController } from "./controllers/LogsController.js";

const router = Router();

// Categories
router.get("/categories", CategoryController.list);
router.get("/categories/:id", CategoryController.get);
router.post("/categories", CategoryController.create);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

// Sellers
router.get("/sellers", SellerController.list);
router.get("/sellers/:id", SellerController.get);
router.post("/sellers", SellerController.create);
router.put("/sellers/:id", SellerController.update);
router.delete("/sellers/:id", SellerController.delete);

// Products
router.get("/products", ProductController.list);
router.get("/products/:id", ProductController.get);
router.get("/products/details/:id", ProductController.details);
router.get("/products/category/:categoryId", ProductController.listByCategory);
router.get("/products/seller/:sellerId", ProductController.listBySeller);
router.post("/products", ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);

// alias with requested path
router.get("/product/detais/:id", ProductController.details);

// Logs
router.get("/logs", LogsController.list);

export default router;

// #swagger.tags = ['Categories', 'Sellers', 'Products']
// #swagger.components.schemas = { Category: {}, Seller: {}, Product: {} }




