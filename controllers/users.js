const User = require('../models/users');
const Property = require('../models/properties');
const bcrypt  = require('bcryptjs');

module.exports = {
    index: async (req, res) => {
        try {
        const allUsers = await User.find({});
        res.render('../views/users/index', {title: 'Users', users: allUsers })
        } catch (err) {
            res.send(err);
        }
    },
    new: async (req, res) => {
        res.render('../views/users/new', {title: 'Person'});
    },

    newmain: async (req, res) => {
        res.render('../views/users/newmain', {title: 'Maintenence'});
    },

    create: async (req, res) => {
        try {
         //create Payments or Maintence Requests.


        } catch (err) {
          res.send(err);
        }
    },

    update: async (req, res) => {
        try {
            const updatedUser = req.body;
            updatedUser.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            User.findByIdAndUpdate(req.params.id, updatedUser, {new: true}, (err, newUser) => {
                res.redirect(`/users/${req.params.id}`)
            })
        } catch (err) {
            res.send(`this is the error ${err}`)
        }

        
    },
    show: async (req, res) => {
        try {
            const foundProperty = await Property.find({'tenants': req.params.id});

            const foundTenant = await User.findById(req.params.id);
            // const foundProperty = await Property.findById(req.params.id).populate('tenants');
            res.render('../views/users/show', {title: 'Show Page', 
            prop: foundProperty,
            users: foundTenant
            })
        } catch (err) {
            res.send(err);
        }
    }


}
