var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const plantSchema = new Schema({
    plantName: {
        type: String,
        required: true
    },
    plantNickName: {
        type: String,
    },
    wateredDate: {
        type: Date
    },
    datePurchased: {
        type: Date,
        default: () => new Date()
    }
});

module.exports = mongoose.model('Plant', plantSchema);