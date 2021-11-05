const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/api/tags', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product },
                { model: ProductTag}
              ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/api/tags/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    res.status(200).json(oneTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/api/tags/', async (req, res) => {
  // create a new tag
  try {
    const newTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/api/tags/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const upTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!upTagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(upTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/api/tags/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delTagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(delTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
