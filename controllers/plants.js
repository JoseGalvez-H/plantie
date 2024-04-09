var Plant = require('../models/plant');

module.exports = {
    index
}

function index(req, res) {
    const plants = Plant.find({});
    res.render('plants/index', { title: 'All Plants', plants });
}