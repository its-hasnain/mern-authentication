const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controller/category");

router.route("/categories").post(createCategory);
router.route("/categories/:categoryId").put(updateCategory);
router.route("/categories").get(getCategories);
router.route("/categories/:categoryId").delete(deleteCategory);

module.exports = router;
