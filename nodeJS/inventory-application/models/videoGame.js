const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoGameSchema = new Schema({
    title: { type: String, required: true, minlength: 1, maxlength: 50 },
    category: [{ type: Schema.Types.ObjectId, ref: 'category', required: true }],
    description: { type: String, required: true, minlength: 1 },
    company: { type: String, required: true, minlength: 1, maxlength: 20 },
    price: { type: Number, required: true, min: 0 }
});

VideoGameSchema
.virtual('url')
.get(function() {
    return `/game/${this._id}`;
});

module.exports = mongoose.model('video_game', VideoGameSchema);