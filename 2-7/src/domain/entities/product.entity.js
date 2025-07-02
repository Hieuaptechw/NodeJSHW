class Product {
  constructor({ id, name, price, description, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  validate() {
    if (!this.name) throw new Error('Product name is required');
    if (!this.price || this.price <= 0) throw new Error('Invalid product price');
    return true;
  }
}

module.exports = Product;