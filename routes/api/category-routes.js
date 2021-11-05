const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const upCatData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!upCatData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(upCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCatData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delCatData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(delCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
