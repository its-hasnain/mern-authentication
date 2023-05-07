const Cars = require('../model/cars');
const Category = require('../model/category');
const { Types } = require('mongoose');
// Get all cars
const getCars = async (req, res) => {
  try {
    const cars = await Cars.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new car



// Create a new car
const createCar = async (req, res) => {
    try {
      const { registrationNo, model, make, color, category } = req.body;
  
      if (!registrationNo || !model || !make || !color || !category) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const isValidObjectId = Types.ObjectId.isValid(category);
      if (!isValidObjectId) {
        return res.status(400).json({ message: 'Invalid Category ID' });
      }
  
      const car = new Cars({ registrationNo, model, make, color, category });
  
      const savedCar = await car.save();
  
      const carWithCategory = await Cars.aggregate([
        {
          $match: { _id: savedCar._id }
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $unwind: '$category'
        },
        {
          $project: {
            _id: 1,
            registrationNo: 1,
            model: 1,
            make: 1,
            color: 1,
            category: {
              _id: '$category._id',
              name: '$category.name'
            }
          }
        }
      ]);
  
      res.status(201).json({ message: 'Car created successfully', car: carWithCategory[0] });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  

// Update a car
const updateCar = async (req, res) => {
  try {
    const updatedCar = await Cars.findByIdAndUpdate(req.params.carId, req.body, { new: true }).populate('category');
    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a car
const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Cars.findByIdAndDelete(req.params.carId);
    res.status(200).json({ message: 'Car deleted successfully', car: deletedCar });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCars,
  createCar,
  updateCar,
  deleteCar,
};
