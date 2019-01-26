const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {type: String, unique: true},
  password: String,
  landlord: Boolean
});

// Send/Reponse Maintenence
// Collect and Send Rent


module.exports = mongoose.model('User', userSchema);
