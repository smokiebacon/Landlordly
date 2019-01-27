const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {type: String, unique: true},
  password: String,
  landlord: Boolean
});

// Send/Reponse Maintenence
// Collect and Send Rent


const User = mongoose.model('User', userSchema);
module.exports = User;
