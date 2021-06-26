const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
      first: {type: String, required: true},
      last: {type: String, required: true}
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
{ collection: 'users' }
)

UserSchema.virtual('fullName').
  get(function() {
    return this.name.first + ' ' + this.name.last;
    }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;