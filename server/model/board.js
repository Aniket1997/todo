const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, trim: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tasks:{type:mongoose.Schema.Types.ObjectId,ref:'Task',required:true},
    status: {type: String,enum: ['Active', 'Dismissed'],default: 'Active',},
    reason:{type:String,required:true}
}, { timestamps: true });


module.exports = mongoose.model('boards',boardSchema);