const mongoose = require('mongoose')
const RemedySchema = mongoose.Schema({
    symptoms: {
        type: [String],
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    remedy: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('remedy', RemedySchema);