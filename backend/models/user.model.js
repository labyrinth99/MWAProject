const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    role: String
});
UserSchema.statics.findByEmail = function(email) {
    return this.findOne({ username: email });
}
module.exports = mongoose.model('User', UserSchema);