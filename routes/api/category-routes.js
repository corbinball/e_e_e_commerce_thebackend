const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/api/categories', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/api/categories/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCatData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    res.status(200).json(oneCatData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/api/categories', (req, res) => {
  // create a new category
  try {
    const newCatData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCatData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/api/categories/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/api/categories/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
