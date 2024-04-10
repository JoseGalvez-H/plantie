var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const plantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
    },
    wateredDate: {
        type: Date,
        default: () => new Date()
    },
    datePurchased: {
        type: Date,
    }
});

module.exports = mongoose.model('Plant', plantSchema);