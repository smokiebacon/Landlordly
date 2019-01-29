const User = require('../models/users');
const Property = require('../models/properties');


const bcrypt  = require('bcryptjs');
//registration
module.exports = {
    registration: async (req, res) => {
       //const email = req.body.email;
       const password = req.body.password;
       const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
       //put in database
       let newUser = {};
       newUser = req.body;
       newUser.password = hashedPassword;
       //newUser.accountType = req.body.accountType === 'landlord' ? 'landlord ' : 'tenant'; //build this into our form ( checkbox or drop down)
       if (req.body.account === 'Landlord') {
        newUser.account = 'Landlord';
        } else if (req.body.account === 'Tenant') {
        newUser.account = 'Tenant';
        }
       try {
           let createdUser;
           if (req.body.account === 'Landlord') {
            createdUser = await User.create(newUser);
           } else if (req.body.account === 'Tenant') {
            createdUser = await User.create(newUser);
           }
           console.log(createdUser);
           //create a session
           req.session.accountType = createdUser.account;
           req.session.id = createdUser._id;
           req.session.email = createdUser.email;
           req.session.logged = true;
           if (createdUser.account === 'Landlord') {
            res.redirect('/properties');
        } else if (createdUser.account === 'Tenant') {
            res.redirect('/users');
        }

       } catch (err) {
           res.send(err);
       } 
    },
    getlogin: (req, res) => {
        res.render('../views/auth/login', {title: 'Login'});
    },

    login: async (req, res) => {
      try {
        let loggedUser;  
        if (req.body.account === 'Landlord') {
            loggedUser = await User.findOne({email: req.body.email});
        } else if (req.body.account === 'Tenant') {
            loggedUser = await User.findOne({email: req.body.email});
        }
        if (loggedUser) { //checking if user is in database
            if (bcrypt.compareSync(req.body.password, loggedUser.password)) { //check if password match
                req.session.user = loggedUser;
                req.session.message = '';
                req.session.logged = true;
                req.session.email = loggedUser.email;
                if (loggedUser.account === 'Landlord') {
                    res.redirect('/properties');
                } else if (loggedUser.account === 'Tenant') {
                    res.redirect('/users');
                }
                //if (loggedUser.accountType === landlord or tenant)
                //res.redirect('/properties'); //redirect to Tenant or Landlord Page
            
            } else {
                req.session.message = "Email or password is incorrect";
                res.redirect('/');
            }   

        } else {
            console.log(loggedUser);
            req.session.message = 'Email does not exist';
            res.redirect('/');
        }
            //if they match, redirect to page
            //if password dont match, keep them on login page with msg: wrong credentials
      } catch (err) {
          console.log('HITTING THE ERROR', err);
          res.send(err);
      } 
    },
//logout to //authentication/logout
    logout: async(req, res) => {
        req.session.destroy((err) => {
            err ? res.send(err) : res.redirect('/');
        })
    }
}
