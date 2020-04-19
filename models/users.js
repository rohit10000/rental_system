const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    },
    rent_id: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);