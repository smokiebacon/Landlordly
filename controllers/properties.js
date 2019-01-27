const Property = require('../models/properties');
const User = require('../models/users');

module.exports = {
    index: async (req, res) => {
        try {
        const allProperties = await Property.find({});
        res.render('../views/properties/index', {title: 'Properties',
         props: allProperties })
            
        } catch (err) {
            res.send(err);
        }
    },

    new: (req, res) => {
        res.render('../views/properties/new', {title: 'Property'});
    },

    create: async (req, res) => {
        try {
          const createdProperty = await Property.create(req.body);  
          console.log(createdProperty); 
          res.redirect('/property');
        } catch (err) {
            res.send(err);
        }
    },
    
    edit: async (req, res) => {
        try {
            const editProperty = await Property.findById(req.params.id);
            console.log(editProperty);
            res.render('../views/properties/:id/edit', {title: 'Edit'}, {
                property: editProperty
            })
        }
            catch (err) {
            res.send(err);
            }
        },

    show: async (req, res) => {
        try {
            const foundProperty = await Property.findById(req.params.id);
            console.log(foundProperty);
            res.render('../views/properties/show', {title: 'Show Page', 
            prop: foundProperty 
            })
        } catch (err) {
            res.send(err);
        }
       
    }    
}