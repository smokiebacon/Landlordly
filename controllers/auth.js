const Auth = require('../models/auth');
const bcrypt  = require('bcryptjs');


//registration
module.exports = {
    registration: async (req, res) => {
       //const email = req.body.email;
       const password = req.body.password;
       const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
       //put in database
       
       const newUser = {}; //set to empty object, have to push into object
       newUser.email = req.body.email;
       newUser.password = hashedPassword;
       //newUser.accountType = req.body.accountType === 'landlord' ? 'landlord ' : 'tenant'; //build this into our form ( checkbox or drop down)

       try {
        //    const createdUser = "";
        //    if (accountType === 'landlord') {
        //      createdUser = await Landlord.create(newUser);
        //    } else {
        //      createdUser = await Tenant.create(newUser);
        //    }
           const createdUser = await Auth.create(newUser);
           //create a session
       //  req.session.accountType = createdUser.accountType;
           req.session.email = createdUser.email;
           req.session.logged = true;
           //req.session.AccountType = createdUser.AccountType; Will Need Landlord or Tenant
           //redirect to specific index
           res.redirect('/properties'); 
       } catch (err) {
           res.send(err);
       } 
    },

    login: async (req, res) => {
      try {
        //find logged in User, //getting email from req.body (name that was attached to Form)
        const loggedUser = await Auth.findOne({ email: req.body.email});
        console.log(`LOGGED USER: ================ ${Auth.email}`)
        if (loggedUser) { //checking if user is in database
            if (bcrypt.compareSync(req.body.password, loggedUser.password)) { //check if password match
                req.session.message = '';
                req.session.logged = true;
                req.session.email = loggedUser.email;
                //if (loggedUser.accountType === landlord or tenant)
                res.redirect('/properties'); //redirect to Tenant or Landlord Page
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
