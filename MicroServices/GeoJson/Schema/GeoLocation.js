const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoLocationSchema = new Schema({
    postId: { type: String },
    type: { type: String },
    geometry: { 
        type: { type: String },
        coordinates: {type: Array, of: Number}
    },
    properties: { 
        name: { type: String },
    },
}, { timestamps: true }
);

const Airport = mongoose.model('GeoLocation', GeoLocationSchema);
module.exports = Airport;