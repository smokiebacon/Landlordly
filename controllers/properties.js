const Property = require('../models/properties');
const User = require('../models/users');
//const Auth = require('../models/auth');

module.exports = {
    index: async (req, res) => {
        try {
         const allProperties = await Property.find({});      
         const allUsers = await User.find({});    
         res.render('../views/properties/index', {title: 'Properties',
         props: allProperties,
         users: allUsers
        })
    } catch (err) {
            res.send(err);
        }
    },  

    new: (req, res) => {
        res.render('../views/properties/new', {title: 'Property',
        });
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
            const foundTenant = await User.findById(req.params.id);
            const foundProperty = await Property.findById(req.params.id).populate('tenants');
            res.render('../views/properties/show', {title: 'Show Page', 
            prop: foundProperty,
            users: foundTenant
            // populate('tenants')
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
    },
    
    showAddTenant: (req, res) => {
        res.render('properties/showAddProperty', {title: 'Invite', property: {_id: req.params.id}});
    },

    addTenant: async (req, res) => {
        // create the user but just the email
        try {
        const createdUser = await User.create(req.body);
        const foundProperty = await Property.findById(req.params.id);
        foundProperty.tenants.push(createdUser);
        foundProperty.save();
        res.redirect(`/properties/${foundProperty._id}`);
        } catch (err) {
            res.send(err);
        }

            // console.log(user) to make sure its creating the user
            //find the proprty with req.parmas.id
            // then push user._id into array 
            // then save proptry
    //}
        // push the users _id into the property user array
        // send out the invite to email
        // the link would look like this e.g. users/<user id>/new
        //console.log(req.body);
    }
}