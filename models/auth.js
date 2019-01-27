const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
  email: {type: String, unique: true},
  password: String
});

authSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// adds a method to a user document object to check if provided password is correct
authSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// middleware: before saving, check if password was changed,
// and if so, encrypt new password before saving:
authSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this.generateHash(this.password);
  }
  next();
});

module.exports = mongoose.model('Auth', authSchema);
