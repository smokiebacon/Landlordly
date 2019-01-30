const Property = require('../models/properties');
const User = require('../models/users');
const nodemailer = require("nodemailer");

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
        })
    },

    create: async (req, res) => {
    try {
        //const createdProperty = await Property.create(req.body);  
        const newProperty = new Property(req.body);
        newProperty.landlord = req.session.user._id;
        newProperty.save()
            .then(() => {
                res.redirect('/properties');
        });
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
        res.redirect(`/properties/${updateProperty._id}`);    
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
        try {
        const createdUser = await User.create(req.body);
        const foundProperty = await Property.findById(req.params.id);
        foundProperty.tenants.push(createdUser);
        foundProperty.save();
        main(createdUser);
        res.redirect(`/properties/${foundProperty._id}`);
        } catch (err) {
            res.send(err);
        }
        async function main (createdUser){
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "email-smtp.us-west-2.amazonaws.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'AKIAJTW45K7NDIADUYBQ', // generated ethereal user
                pass: 'BI5LWRZHEGxFFrDOEzwNf4uoYYV0A1DYt55FumX2fNSN' // generated ethereal password
              }
            });
            // setup email data with unicode symbols
            let mailOptions = {
              from: '"Landlordly" <smokiebacon@gmail.com>', // sender address
              to: "smokiebacon@gmail.com", // list of receivers
              subject: "Landlordly: Invite to Register as Tenant", // Subject line
              text: `Welcome to Landlordly! Abe has invited you to become a tenant at <this address> Sign up for a free account at http://localhost:3000/signin-tenant/${createdUser._id}`, // plain text body
            };
            // send mail with defined transport object
            let info = await transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);          
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }
    }
}