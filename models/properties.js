const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
  address: {type: String, required: true},
  landlord: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  tenants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  city: String,
  state: String,
  userId: String,
  zip: Number,
  maintenenceForm: String,
  image: {type: String, default: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/house-icon.png"}
  // beds: Number,
  // bathrooms: Number,
  // sqft: Number,
  // maintenence: Boolean, 
  // rent: Number,
  // image: [String]
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
