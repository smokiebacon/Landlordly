const Property = require('../models/properties');
module.exports = {
    index: async (req, res) => {
        try {
        // const player = await Property.find({});
        res.render('../views/properties/index', {title: 'Property'}, {
            properties: allProperties
        })
        } catch (err) {
            res.send(err);
        }
    },
    new: async (req, res) => {
        res.render('../views/properties/new', {title: 'Property'});
    }
}