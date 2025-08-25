import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController.js";
import { SellerController } from "./controllers/SellerController.js";
import { ProductController } from "./controllers/ProductController.js";
import { LogsController } from "./controllers/LogsController.js";
import { FileCategoryRepository } from "../repositories/CategoryRepository.js";
import { FileSellerRepository } from "../repositories/SellerRepository.js";
import { FileProductRepository } from "../repositories/ProductRepository.js";
import { CreateProduct } from "../../application/usecases/product/CreateProduct.js";
import { UpdateProduct } from "../../application/usecases/product/UpdateProduct.js";
import { DeleteProduct } from "../../application/usecases/product/DeleteProduct.js";
import { ListProducts } from "../../application/usecases/product/ListProducts.js";
import { GetProductById } from "../../application/usecases/product/GetProductById.js";
import { GetProductsByCategory } from "../../application/usecases/product/GetProductsByCategory.js";
import { GetProductsBySeller } from "../../application/usecases/product/GetProductsBySeller.js";
import { GetProductDetails } from "../../application/usecases/product/GetProductDetails.js";
import { CreateCategory } from "../../application/usecases/category/CreateCategory.js";
import { UpdateCategory } from "../../application/usecases/category/UpdateCategory.js";
import { DeleteCategory } from "../../application/usecases/category/DeleteCategory.js";
import { ListCategories } from "../../application/usecases/category/ListCategories.js";
import { GetCategoryById } from "../../application/usecases/category/GetCategoryById.js";
import { CreateSeller } from "../../application/usecases/seller/CreateSeller.js";
import { UpdateSeller } from "../../application/usecases/seller/UpdateSeller.js";
import { DeleteSeller } from "../../application/usecases/seller/DeleteSeller.js";
import { ListSellers } from "../../application/usecases/seller/ListSellers.js";
import { GetSellerById } from "../../application/usecases/seller/GetSellerById.js";

const router = Router();

// repositories
const productRepo = new FileProductRepository();
const categoryRepo = new FileCategoryRepository();
const sellerRepo = new FileSellerRepository();

// product use cases
const listProducts = new ListProducts(productRepo);
const getProductById = new GetProductById(productRepo);
const getProductsByCategory = new GetProductsByCategory(productRepo);
const getProductsBySeller = new GetProductsBySeller(productRepo);
const getProductDetails = new GetProductDetails(productRepo, categoryRepo, sellerRepo);
const createProduct = new CreateProduct(productRepo, categoryRepo, sellerRepo);
const updateProduct = new UpdateProduct(productRepo, categoryRepo, sellerRepo);
const deleteProduct = new DeleteProduct(productRepo);

// category use cases
const listCategories = new ListCategories(categoryRepo);
const getCategoryById = new GetCategoryById(categoryRepo);
const createCategory = new CreateCategory(categoryRepo);
const updateCategory = new UpdateCategory(categoryRepo);
const deleteCategory = new DeleteCategory(categoryRepo, productRepo);

// seller use cases
const listSellers = new ListSellers(sellerRepo);
const getSellerById = new GetSellerById(sellerRepo);
const createSeller = new CreateSeller(sellerRepo);
const updateSeller = new UpdateSeller(sellerRepo);
const deleteSeller = new DeleteSeller(sellerRepo, productRepo);

// controllers
const productController = new ProductController(
  listProducts,
  getProductById,
  getProductDetails,
  getProductsByCategory,
  getProductsBySeller,
  createProduct,
  updateProduct,
  deleteProduct
);
const categoryController = new CategoryController(
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
);
const sellerController = new SellerController(
  listSellers,
  getSellerById,
  createSeller,
  updateSeller,
  deleteSeller
);

// Categories
router.get("/categories", categoryController.list.bind(categoryController));
router.get("/categories/:id", categoryController.get.bind(categoryController));
router.post("/categories", categoryController.create.bind(categoryController));
router.put("/categories/:id", categoryController.update.bind(categoryController));
router.delete("/categories/:id", categoryController.delete.bind(categoryController));

// Sellers
router.get("/sellers", sellerController.list.bind(sellerController));
router.get("/sellers/:id", sellerController.get.bind(sellerController));
router.post("/sellers", sellerController.create.bind(sellerController));
router.put("/sellers/:id", sellerController.update.bind(sellerController));
router.delete("/sellers/:id", sellerController.delete.bind(sellerController));

// Products
router.get("/products", productController.list.bind(productController));
router.get("/products/:id", productController.get.bind(productController));
router.get("/products/details/:id", productController.details.bind(productController));
router.get("/products/category/:categoryId", productController.listByCategory.bind(productController));
router.get("/products/seller/:sellerId", productController.listBySeller.bind(productController));
router.post("/products", productController.create.bind(productController));
router.put("/products/:id", productController.update.bind(productController));
router.delete("/products/:id", productController.delete.bind(productController));

// alias with requested path
router.get("/product/detais/:id", productController.details.bind(productController));

// Logs
router.get("/logs", LogsController.list);

export default router;

// #swagger.tags = ['Categories', 'Sellers', 'Products']
// #swagger.components.schemas = { Category: {}, Seller: {}, Product: {} }




