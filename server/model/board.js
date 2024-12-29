const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, trim: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });


module.exports = mongoose.model('boards',boardSchema);