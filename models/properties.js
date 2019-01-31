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
  image: {type: String, default: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fpaomedia%2Fsmall-n-flat%2F1024%2Fhouse-icon.png&f=1"}
  // beds: Number,
  // bathrooms: Number,
  // sqft: Number,
  // maintenence: Boolean, 
  // rent: Number,
  // image: [String]
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
