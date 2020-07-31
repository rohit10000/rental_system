const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const flatSchema = new Schema({
   price:{
       type: Number,
       required: true,
       min: 0
   },
    name:{
       type: String,
        required: true
    },
    state:{
       type: Boolean,
        required: true
    },
},{
    timestamps: true
});

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
    max_slot: {
        type: Number,
        default: 0
    },
    booked_slot: {
        type: Number,
        default: 0
    },
    flat:[flatSchema]
}, {
    timestamps: true
});

var Rents = mongoose.model('Rent', rentSchema);

module.exports = Rents;