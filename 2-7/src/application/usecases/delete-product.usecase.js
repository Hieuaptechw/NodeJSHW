const Product = require('../../domain/entities/product.entity');
class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId) {
    return await this.productRepository.delete(productId);
  }
}

module.exports = DeleteProductUseCase;