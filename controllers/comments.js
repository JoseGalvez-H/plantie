const Comment = require('../models/comment');
const Plant = require('../models/plant');

module.exports = {
    create,
    update,
    delete: deleteComment
};

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
        plant.comments.unshift(comment); 
        await plant.save(); 
        res.redirect(`/plants/${plant._id}`); 
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).send("Error creating comment");
    }
}

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
        const comment = await Comment.findById(req.params.id).populate('plant');
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        if (!comment.plant) {
            return res.status(404).send("Associated plant not found.");
        }
        const plantId = comment.plant._id;
        await Comment.deleteOne({ _id: req.params.id });
        res.redirect(`/plants/${plantId}`);
    } catch (error) {
        res.status(500).send("Error deleting comment");
    }
}

