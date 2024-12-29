const Board = require('../model/board');

exports.createBoard = async (req, res) => {
    try {
        const { name, description, manager, team } = req.body;

        // Validate required fields
        if (!name || !manager) {
            return res.status(400).json({
                status: 'Failure',
                message: 'Name and manager are required',
            });
        }

        // Create new board
        const board = new Board({
            name,
            description,
            manager,
            team,
        });

        await board.save();

        // Success response
        return res.status(201).json({
            status: 'Success',
            message: 'Successfully created board',
            board: board,
        });
    } catch (err) {
        // Error response
        return res.status(500).json({
            status: 'Failure',
            message: 'Internal Server Error',
        });
    }
};
