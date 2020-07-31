const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: true
    },
    firstname:{
      type: String,
      required:true
    },
    lastname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    rent_id: {
        type: Array,
        default: null,
        required: false
    },
    flat_id: {
        type: Array,
        default: null,
        required: false
    }
}, {
    timestamps: true
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);