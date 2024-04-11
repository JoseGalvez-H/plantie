var Plant = require('../models/plant');

module.exports = {
    formatDate,
    index,
    create,
    newPlantForm,
    showDetails,
    deletePlant,
    lastWatered
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
}

async function index(req, res) {
    try {
        let plants = await Plant.find({});
        plants = plants.map(plant => ({
            ...plant.toObject(), 
            wateredDate: formatDate(plant.wateredDate)
        }));
        res.render('plants/index', { title: 'All Plants', plants });
    } catch (error) {
        console.error("Error fetching plants:", error);
        res.status(500).send("Error fetching plants");
    }
}


async function create(req, res) {
    try {
        const plantData = {
            name: req.body.name,
            nickname: req.body.nickname,
            wateredDate: req.body.wateredDate,
        };
        await Plant.create(plantData);
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
        const plant = await Plant.findById(req.params.id).populate('comments');
        if (!plant) {
            return res.status(404).send('Plant not found');
        }
        res.render('plants/show', { plant });
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

async function lastWatered(req, res) {
    try {
        const plantId = req.params.id;
        const { lastWateredDate } = req.body;
        await Plant.findByIdAndUpdate(plantId, { wateredDate: lastWateredDate });
        res.redirect('/plants');
    } catch (error) {
        console.error("Error updating plant's last watered date:", error);
        res.status(500).send("Error updating the date");
    }
}
