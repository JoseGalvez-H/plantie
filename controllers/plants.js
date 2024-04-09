var Plant = require('../models/plant');

module.exports = {
    index
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
