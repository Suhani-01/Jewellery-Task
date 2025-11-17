const Category = require('../models/Category');
const Product = require('../models/Product');
const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required(),
  imageUrl: Joi.string().uri()
});

// GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/categories/:id/products
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/categories (admin)
const createCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, getProductsByCategory, createCategory };
