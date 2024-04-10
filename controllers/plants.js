var Plant = require('../models/plant');

module.exports = {
    index,
    create,
    newPlantForm,
    showDetails,
    deletePlant
}

async function index(req, res) {
    try {
        const plants = await Plant.find({});
        res.render('plants/index', { title: 'All Plants', plants });
    } catch (error) {
        console.error("Error fetching plants:", error);
        res.status(500).send("Error fetching plants");
    }
}

async function create(req, res) {
    try {
        await Plant.create(req.body); 
        res.redirect('/plants'); 
    } catch (error) {
        console.error("Failed to add plant:", error);
        res.status(500).send("Error adding plant");
    }
}

function newPlantForm(req, res) {
    res.render('plants/new'); 
}

async function showDetails(req, res) {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) {
            return res.status(404).send('Plant not found');
        }
        res.render('plants/show', { plant: plant }); 
    } catch (error) {
        console.error("Error fetching plant details:", error);
        res.status(500).send("Error fetching plant details");
    }
}

async function deletePlant(req, res) {
    try {
        await Plant.findByIdAndDelete(req.params.id);
        res.redirect('/plants');
    } catch (err) {
        console.log(err);
        res.redirect('/plants');
    }
};
