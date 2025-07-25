
class GetProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId) {
    return await this.productRepository.findById(productId);
  }
}

module.exports = GetProductUseCase;