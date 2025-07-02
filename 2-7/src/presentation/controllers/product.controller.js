class ProductController {
  constructor(
    createProductUseCase,
    getProductUseCase,
    updateProductUseCase,
    deleteProductUseCase,
    productRepository

  ) {
    this.createProductUseCase = createProductUseCase;
    this.getProductUseCase = getProductUseCase;
    this.updateProductUseCase = updateProductUseCase;
    this.deleteProductUseCase = deleteProductUseCase;
    this.productRepository = productRepository;
  }

  async createProduct(req, res) {
    try {
      const product = await this.createProductUseCase.execute(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await this.getProductUseCase.execute(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await this.updateProductUseCase.execute(
        req.params.id,
        req.body
      );
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      await this.deleteProductUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
async listProducts(req, res) {
    try {
      const products = await this.productRepository.findAll();
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ProductController;