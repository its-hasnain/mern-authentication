const express = require('express');
const router = express.Router();
const {
  getCars,
  createCar,
  updateCar,
  deleteCar
} = require("../controller/cars");

router.route("/cars").post(createCar);
router.route("/cars/:carId").put(updateCar);
router.route("/cars").get(getCars);
router.route("/cars/:carId").delete(deleteCar);

module.exports = router;
