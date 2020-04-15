const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const rentSchema = new Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    owner_name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    rentee_id: {
        type: String,
        default: null,
        required: false
    }
}, {
    timestamps: true
});

var Rents = mongoose.model('Rent', rentSchema);

module.exports = Rents;