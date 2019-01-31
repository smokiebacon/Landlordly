const User = require('../models/users');
const Property = require('../models/properties');
const bcrypt  = require('bcryptjs');
const paypal = require('paypal-rest-sdk');

module.exports = {
    index: async (req, res) => {
        try {
        const allUsers = await User.find({});
        const allProperty = await Property.find();
        res.render('../views/users/index', {title: 'Users', users: allUsers, prop: allProperty })
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

    newpay: async (req, res) => {
        res.render('../views/users/newpay', {title: 'Pay Rent'});
    },

    pay: (req, res) => {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Rent",
                        "sku": "001",
                        "price": "100",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "100"
                },
                "description": "Monthly rent."
            }]
        };
        
        
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                res.send(error);
            } else {
                console.log("Create Payment Response");
                console.log(payment);

            }
        });
    },

    create: () => console.log('create'),

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
            //const foundProperty = await Property.find({'tenants': req.params.id});
            const foundTenant = await User.findById(req.params.id);
            const foundProperty = await Property.findOne({'tenants': req.params.id})
            // const foundProperty = await Property.findById(req.params.id).populate('tenants');

            console.log('FOUND TENANT:==============', foundTenant);
            console.log('FOUND PROPERTY:==============', foundProperty);
            // const foundProperty = await Property.findById(req.params.id).populate('tenants');
            res.render('../views/users/show', {title: 'Tenant Profile', 
            prop: foundProperty,
            users: foundTenant
            })
        } catch (err) {
            res.send(err);
        }
    },
    delete: async (req, res) => {
        try {
            const deletedProperty = await Property.findById(req.params.id);
            deletedProperty.tenants = [];
            deletedProperty.save();
            res.redirect(`/properties/${req.params.id}`);

            console.log(deletedProperty);
            // .remove({}, (err, deletedTenant) => {
            //     console.log(deletedProperty);
            //     res.redirect(`/properties/${req.params.id}`);
            // });
           
  
        } catch (err) {
            res.send(err)
        }

    },
    deletedTenant: async (req, res) => {
        try {
            const deletedTenant = await User.findByIdAndDelete(req.params.id);
            console.log(deletedTenant);
            // deletedTenant.save();
            res.redirect('back');
        } catch (err) {
            res.send(err)
        }

    },
  


}
