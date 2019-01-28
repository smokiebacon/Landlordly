const User = require('../models/users');
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
    create: async (req, res) => {
        try {
          const createdTenant = await User.create(req.body);  
          console.log(createdTenant);
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


}
