const express = require('express');
const { connect } = require('./src/infrastructure/database/mongodb');
const initProductRoutes = require('./src/presentation/routes/product.routes');
const MongoDBProductRepository = require('./src/infrastructure/repositories/product.repository.impl');
const CreateProductUseCase = require('./src/application/usecases/create-product.usecase');
const GetProductUseCase = require('./src/application/usecases/get-product.usecase');
const UpdateProductUseCase = require('./src/application/usecases/update-product.usecase');
const DeleteProductUseCase = require('./src/application/usecases/delete-product.usecase');

require('dotenv').config();
async function startServer() {
  const app = express();
  app.use(express.json());
  await connect();
  const productRepository = new MongoDBProductRepository();
  const createProductUseCase = new CreateProductUseCase(productRepository);
  const getProductUseCase = new GetProductUseCase(productRepository);
  const updateProductUseCase = new UpdateProductUseCase(productRepository);
  const deleteProductUseCase = new DeleteProductUseCase(productRepository);

  app.use(
    '/api/products',
    initProductRoutes(
      createProductUseCase,
      getProductUseCase,
      updateProductUseCase,
      deleteProductUseCase,
      productRepository
    )
  );

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);