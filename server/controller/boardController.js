const Board = require('../model/board');

exports.createBoard = async (req, res) => {
    try {
        const { name, description, manager, team,tasks } = req.body;

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
            tasks
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

exports.dismissBoard = async (req, res) => {
    try {
        const { reason, boardId } = req.body;

        // Validate required fields
        if (!reason || !boardId) {
            return res.status(400).json({
                status: 'Failure',
                message: 'Reason and BoardId are mandatory',
            });
        }

        // Update the board status
        const board = await Board.findByIdAndUpdate(
            boardId,
            { status: 'Dismissed', reason }, // Including the reason in the update
            { new: true } // Return the updated document
        );

        if (!board) {
            return res.status(404).json({
                status: 'Failure',
                message: 'Board not found',
            });
        }

        // Success response
        return res.status(200).json({
            status: 'Success',
            message: 'Board successfully dismissed',
            board,
        });
    } catch (error) {
        // Error response
        return res.status(500).json({
            status: 'Failure',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

exports.updateBoard = async(req,res)=>{
    try{
        const { boardId } = req.query;
        if(!boardId)
        {
            return res.status(400).json({status:'Failure',message:'Board Id is required'});
        }
        const board = await Board.findById(boardId);
        if(board.status === "Dismissed")
        {
            return res.status(200).json({status:'Success',message:'Board is already dismissed'});
        }
        const updates = req.body;
        const updatedBoard = await Board.findByIdAndUpdate(
            boardId,
            { ...updates },
            { new: true } // Return the updated document
        );
        return res.status(200).json({status:'Success',message:'board details fetch successfully',updatedBoard});
    }catch(err)
    {
        return res.status(500).json({status:'Failure',message:'Internal Server error',err});
    }
}


