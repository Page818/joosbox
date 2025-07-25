const Product = require('../models/Product');

exports.uploadProduct = async (req, res) => {
  try {
    const { name, description, category, tags, link } = req.body;
    const images = req.files ? req.files.map(file => file.path) : []; // 假設使用多文件上傳

    const product = new Product({
      name,
      description,
      category,
      images,
      tags: tags ? tags.split(',') : [], // 假設 tags 是逗號分隔的字符串
      link,
    });
    await product.save();

    res.status(201).json({ message: '產品上傳成功', product });
  } catch (error) {
    res.status(500).json({ message: '上傳失敗', error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: '獲取產品失敗', error: error.message });
  }
};