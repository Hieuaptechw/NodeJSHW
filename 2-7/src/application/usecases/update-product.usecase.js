const Product = require('../../domain/entities/product.entity');
class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId, productData) {
    const product = new Product({ ...productData, id: productId });
    product.validate();
    return await this.productRepository.update(productId, product);
  }
}

module.exports = UpdateProductUseCase;