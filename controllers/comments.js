const Comment = require('../models/comment');
const Plant = require('../models/plant');

module.exports = {
    create,
    getOne,
    update,
    delete: deleteComment
};

// Create a new comment
async function create(req, res) {
    try {
        const plant = await Plant.findById(req.params.id); 
        if (!plant) return res.status(404).send('Plant not found');

        const comment = new Comment({
            text: req.body.text, 
            user: req.user._id, 
            plant: plant._id 
        });
        await comment.save(); 

        plant.comments.push(comment); 
        await plant.save(); 

        res.redirect(`/plants/${plant._id}`); 
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).send("Error creating comment");
    }
}

// Get a single comment by ID
async function getOne(req, res) {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.send(comment.toString());
    } catch (error) {
        console.error("Error getting comment:", error);
        res.status(500).send("Error getting comment");
    }
}

// Update a comment by ID
async function update(req, res) {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.send(comment.toString());
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).send("Error updating comment");
    }
}

async function deleteComment(req, res) {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.send('Comment deleted successfully');
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send("Error deleting comment");
    }
}

