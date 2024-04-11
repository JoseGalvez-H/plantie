const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
