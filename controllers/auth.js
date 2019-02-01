const User = require('../models/users');
const Property = require('../models/properties');


const bcrypt  = require('bcryptjs');
//registration
module.exports = {
    registration: async (req, res) => {
       const password = req.body.password;
       const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
       let newUser = {};
       newUser = req.body;
       newUser.password = hashedPassword;
       console.log(req.body.account)
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
           req.session.accountType = createdUser.account;
           req.session.id = createdUser._id;
           req.session.userId = createdUser._id
           req.session.email = createdUser.email;
           req.session.logged = true;
           if (createdUser.account === 'Landlord') {
            res.redirect(`/properties`);
        } else if (createdUser.account === 'Tenant') {
            res.redirect('/users');
        }

       } catch (err) {
           res.send(err);
       } 
    },
    getlogin: (req, res) => {
        res.render('../views/auth/login', {title: 'Login', message: req.session.message
    });
    },

    getregister: (req, res) => {
        res.render('../views/auth/register', {title: 'Register', message: req.session.message
    });
    },

    login: async (req, res) => {
      try {
        const loggedUser = await User.findOne({email: req.body.email});   
        console.log(loggedUser);     
        if (loggedUser) { //checking if user is in database
            if (bcrypt.compareSync(req.body.password, loggedUser.password)) { //check if password match
                req.session.user = loggedUser;
                req.session.message = '';
                req.session.logged = true;
                req.session.email = loggedUser.email;
                req.session.userId = loggedUser._id;
                if (loggedUser.account === 'Landlord') {
                    res.redirect('/properties')
                } else if (loggedUser.account === 'Tenant') {
                    res.redirect(`/users/${loggedUser._id}`);
                }
            } else {
                req.session.message = "Email or password is incorrect";
                res.redirect('/');
            }   

        } else {
            console.log(loggedUser);
            req.session.message = 'Email does not exist';
            res.redirect('/');
        }
      } catch (err) {
          console.log('HITTING THE ERROR', err);
          res.send(err);
      } 
    },
    logout: async(req, res) => {
        req.session.destroy((err) => {
            err ? res.send(err) : res.redirect('/');
        })
    }
}
