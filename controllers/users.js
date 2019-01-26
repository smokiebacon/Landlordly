const User = require('../models/users');
module.exports = {
    index: async (req, res) => {
        try {
        const player = await User.find({});
        res.render('../views/index', {
            users: allUsers
        })
        } catch (err) {
            res.send(err);
        }
    },
    new: async (req, res) => {
        res.render('../views/users/new', {title: 'Person'});
    }
}