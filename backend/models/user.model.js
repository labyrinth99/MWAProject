const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    Role: Number
});
UserSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email });
}
module.exports = mongoose.model('User', UserSchema);