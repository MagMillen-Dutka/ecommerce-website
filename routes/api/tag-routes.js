const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "The Tag was not found" });
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "There is no Tag with this ID" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "The Tag was not found!" });
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "Creating Tag did not work" });
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updated = Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "There is no Tag with this ID" })
      : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Updating Tag did not work" });
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = Tag.destroy({ where: { id: req.params.id } });
    !deleted
      ? res.status(404).json({ message: "There is no Tag with this ID" })
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Deleting Tag did not work" });
  }
});

module.exports = router;
