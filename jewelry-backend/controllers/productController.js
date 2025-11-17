const Product = require('../models/Product');
const Category = require('../models/Category');
const Joi = require('joi');

// Validation schema
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  category: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number().min(0).max(100),
  baseMetal: Joi.string(),
  polish: Joi.string(),
  rating: Joi.number().min(0).max(5),
  imageUrl: Joi.string().uri()
});

// GET /api/products
const getProducts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.metal) filter.baseMetal = req.query.metal;
    if (req.query.priceRange) {
      const [min, max] = req.query.priceRange.split('-').map(Number);
      filter.price = { $gte: min, $lte: max };
    }
    let sort = {};
    switch (req.query.sort) {
      case 'price_low': sort.price = 1; break;
      case 'price_high': sort.price = -1; break;
      case 'latest': sort.createdAt = -1; break;
      case 'popularity': sort.rating = -1; break;
    }
    const products = await Product.find(filter).sort(sort).populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products (admin)
const createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/products/:id (admin)
const updateProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/products/:id (admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
