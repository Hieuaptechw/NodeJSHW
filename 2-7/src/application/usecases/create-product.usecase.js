const Product = require('../../domain/entities/product.entity');
class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    const product = new Product(productData);
    product.validate();
    return await this.productRepository.create(product);
  }
}

module.exports = CreateProductUseCase;