const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, trim: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Employee assigned to the task
    status: { type: String, enum: ['Backlog', 'In Progress', 'Completed'], default: 'Backlog' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Manager
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);


module.exports = mongoose.model('Todo', todoSchema);
