const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  address: {type: String, required: true},
  landlord: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tenants: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  city: String,
  beds: Number,
  bathrooms: Number,
  sqft: Number,
  maintenence: Boolean, 
  rent: Number,
  image: [String]
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
