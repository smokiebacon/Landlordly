const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  address: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tenants: [String],
  city: String,
  beds: Number,
  bathrooms: Number,
  sqft: Number,
  maintenence: Boolean, 
  rent: Number,
  image: [String]
});

module.exports = mongoose.model('Property', propertySchema);
