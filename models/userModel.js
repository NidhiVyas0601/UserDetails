const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  fullName: {
     type: String,
     require: true,
  },
  email: {
     type: String,
     require: true,
     unique: true,
     lowercase: true,
  },
  hash_password: {
     type: String,
     require: true,
  },
  contactNumber: {
     type: String,
  },
  profilePicture: {
     type: String,
  },
  dateOfBirth:{
    type:String
  }

},{ timestamps: true });

userSchema.method({
  async authenticate(password) {
     return bcrypt.compare(password, this.hash_password);
  },
});
module.exports = mongoose.model("User", userSchema);