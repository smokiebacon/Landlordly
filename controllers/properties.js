const Property = require('../models/properties');
const User = require('../models/users');

module.exports = {
    index: async (req, res) => {
        try {
         const allProperties = await Property.find({});      
         res.render('../views/properties/index', {title: 'Properties',
         props: allProperties
        })
    } catch (err) {
            res.send(err);
        }
    },  

    new: async (req, res) => {
        try {
        const allUsers = await User.find({});    
        res.render('../views/properties/new', {title: 'Property',
        users: allUsers
        });
        } catch (err) {
            res.send(err)
        }
    },

    create: async (req, res) => {
        try {
          const createdProperty = await Property.create(req.body);  
          //const user = await User.findById(req.body.userId);
        //   console.log(createdProperty);
        //   console.log(user);
        //   user.properties.push(createdProperty);
        //   user.save();
        //   console.log(user);
          res.redirect('/properties');
        } catch (err) {
            res.send(err);
        }
    },
    
    edit: async (req, res) => {
        try {
            const editProperty = await Property.findById(req.params.id);
            console.log(editProperty);
            res.render('../views/properties/edit', {title: 'Edit',
                prop: editProperty
            })
        }
            catch (err) {
            res.send(err);
            }
        },

    show: async (req, res) => {
        try {
            const foundProperty = await Property.findById(req.params.id);
            res.render('../views/properties/show', {title: 'Show Page', 
            prop: foundProperty 
            })
        } catch (err) {
            res.send(err);
        }
       
    },

    update: async (req, res) => {
        try {
        const updateProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.redirect('/properties');    
        } catch (err){
            res.send(err)
        }
    },
    delete: async (req, res) => {
        try {
            const deletedProperty = await Property.findByIdAndDelete(req.params.id);
            console.log(deletedProperty);
            res.redirect('/properties');
        } catch (err) {
            res.send(err)
        }
    }    
}