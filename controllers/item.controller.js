const Item = require("../models/item.model");
const { itemValidation } = require("../validation/item");

module.exports = {
  list: async (req, res) => {
    try {
      const items = await Item.find({});
      res.json({ items });
    } catch (err) {
      res.status(500).json({ message: "Error while fetching the items" });
    }
  },

  create: async (req, res) => {
    try {
      const itemField = itemValidation(req.body);
      if (!itemField.isValid) {
        return res.status(400).json(itemField.errors);
      }
      const newItem = new Item(itemField.values);
      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error while creating an item" });
    }
  },

  delete: async (req, res) => {
    const itemId = req.params.id;
    if (!itemId) {
      console.log("400 response");
      return res.status(400).send({
        message: "Invalid Request",
      });
    }
    try {
      await Item.findByIdAndRemove(itemId);
      return res.json({ message: "Item Deleted Successfully" });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Not found with id " + itemId,
        });
      }
      return res.status(500).send({
        message: "Error deleting apartment with id " + itemId,
      });
    }
  },
};
