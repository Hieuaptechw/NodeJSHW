const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

function initProductRoutes(
  createProductUseCase,
  getProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
  productRepository
) {
  const productController = new ProductController(
    createProductUseCase,
    getProductUseCase,
    updateProductUseCase,
    deleteProductUseCase,
    productRepository 
  );

  router.post('/', productController.createProduct.bind(productController));
  router.get('/:id', productController.getProduct.bind(productController));
  router.put('/:id', productController.updateProduct.bind(productController));
  router.delete('/:id', productController.deleteProduct.bind(productController));
  router.get('/', productController.listProducts.bind(productController));

  return router;
}

module.exports = initProductRoutes;