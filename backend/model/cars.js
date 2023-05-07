const mongoose = require('mongoose');

const CarsSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  color: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  registrationNo: { type: String, required: true },
});

CarsSchema.pre('find', function (next) {
  this.populate('category');
  next();
});

CarsSchema.pre('findOne', function (next) {
  this.populate('category');
  next();
});

module.exports = mongoose.model('Cars', CarsSchema);
