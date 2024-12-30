const tasks = require('../model/task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description, board, assignedTo, status, createdBy } = req.body;
        if (!title || !description || !board || !createdBy) {
            return res.status(400).json({ status: 'Failure', message: 'Please add the required fields' });
        }
        const task = new tasks({
            title, description, board, assignedTo, status, createdBy
        });
        await task.save();
        return res.status(200).json({ status: 'Success', message: 'Task Created successfully' });
    } catch (err) {
        return res.status(500).json({ status: 'Failure', message: 'Internal Server Error' });
    }
};

//delete exsisting task
exports.deleteTask = async (req, res) => {
    const { taskId } = req.body;

    if (!taskId) {
        return res.status(400).json({ status: 'Failure', message: 'Task Id is required' });
    }

    // Use findByIdAndUpdate to mark the task as deleted
    const task = await tasks.findByIdAndUpdate(taskId, { isDeleted: true }, { new: true });

    // Check if task is not found
    if (!task) {
        return res.status(404).json({ status: 'Failure', message: 'Task Not Found' });
    }
    if (task.isDeleted) {
        return res.status(404).json({ status: 'Failure', message: 'Task Already Deleted' });
    }

    return res.status(200).json({ status: 'Success', message: 'Task deleted successfully' });
};

