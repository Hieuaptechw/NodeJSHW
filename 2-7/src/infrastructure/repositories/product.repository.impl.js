const ProductRepository = require('../../domain/repositories/product.repository');
const { getDb } = require('../database/mongodb');

class MongoDBProductRepository extends ProductRepository {
  constructor() {
    super();
    this.collection = getDb().collection('products');
  }

  async create(product) {
    const result = await this.collection.insertOne(product);
    return { ...product, id: result.insertedId };
  }

  async findById(id) {
    return await this.collection.findOne({ _id: id });
  }

  async update(id, productData) {
    await this.collection.updateOne(
      { _id: id },
      { $set: { ...productData, updatedAt: new Date() } }
    );
    return this.findById(id);
  }

  async delete(id) {
    await this.collection.deleteOne({ _id: id });
    return true;
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }
}

module.exports = MongoDBProductRepository;