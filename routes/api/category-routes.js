const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'not found!' });
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!category) {
      res.status(404).json({ message: 'id not found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'not found!' });
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Creating new category did not work' });
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updated = Category.update(req.body, { where: { id: req.params.id } });

    !updated[0] ? res.status(404).json({ message: 'ID not found' }) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'update failed' });
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = Category.destroy({ where: { id: req.params.id } });
    !deleted ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
