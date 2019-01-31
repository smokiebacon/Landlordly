require('./db/db');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');;
const session = require('express-session');
const paypal = require('paypal-rest-sdk');
const multer = require('multer');

const User = require('./models/users')
const usersRouter = require('./routes/users');
const propertyRouter = require('./routes/properties');
const authRouter = require('./routes/auth');

// Set Storage Engine
const storage = multer.diskStorage( {
  destination: '../public/uploads/',
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + 
      path.extname(file.originalname));
  }
});

//init upload
const upload = multer( {
  storage : storage,
  limits: {fileSize: 10000000},       //set file size in bytes limit
  fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
  }
}).single('myImage');

//check File Type
function checkFileType(file, cb) {
  //allowed extensions
  const fileTypes = /jpeg|jpg|png|gif/;
  //check extention
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb('Error: Only images are allowed.');
  }
}
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: "THIS IS A RANDOM STRING SECTRET",
  resave: false,
  saveUninitialized: false
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    title: 'Home',
    message: req.session.message
  })
});

app.use('/signin-tenant/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)
  console.log(user)
  res.render('loginNewTent', {title: 'New Tenant',
    user
  })
})

app.use('/auth', authRouter);

//app.use((req, res, next) => req.session.logged ? next() : res.redirect('/'));


app.use('/users', usersRouter);
app.use('/properties', propertyRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
/*

[x] each landlord/tenant should only be able to see his own things
[x] Tenant should be able to sign in if Landlord Invited Tenant
[x] populate landlord / property info in Tenant Show page
[x] In Tenant
[x] able to delete one or more tenants from a property
// submit, make a route, save it in database, attach to property. go to landlord show, display all the landlord
 properties, access the maintence form.

[x] Page, show Property and tenant profile
[ ] Maintenence info request
[ ] dashboard for Landlord and Tenant
[ ] Able to Upload Photo of house, landlord, and tenant profile picture
[ ] GOOGLE API for house location
[ ] make amendeties prettified (nice icons for backyard, # of garage, beds, bedrooms, bathrooms, etc, pet allowed?)
[ ] Set Up Fake Payments
[ ] Maintenence info: tenant can send a maintence request via form, with Date and Time submitted 
[ ] landlord notified and sees maintence request. can check off if done with checkbox

*/
