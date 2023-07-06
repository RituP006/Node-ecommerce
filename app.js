// import express
const express = require('express');
const bodyparser = require('body-parser')  // parse the incoming requests body
const path = require('path')
const mongoose = require('mongoose');
const creds = require('./credential');

// express-session is a middleware module in Express. js that allows you to create sessions in your web application. 
// It stores session data on the server side, using a variety of different storage options, and allows you to track the activity of a user across requests
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// protects from CSRF Attacks by storing a token in frontend to validate the request is coming from legitimate site
const csrf = require('csurf'); 

//Connect-flash module for Node.js allows the developers to send a message whenever a user is redirecting to a specified web-page. 
//For example, whenever, a user successfully logged in to his/her account, a message is flashed(displayed) indicating his/her success in the authentication.
const flash = require('connect-flash');

const MONGODB_URI =
`mongodb+srv://${creds.dbCred.dbUser}:${creds.dbCred.dbPassword}@cluster0.u1u2jqj.mongodb.net/shop`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();


// set a global configuration value for view engine and views
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shoproutes = require('./routes/shop')
const authRoutes = require('./routes/auth');

const errorController=require('./controllers/error');
const User = require('./models/user');

app.use(bodyparser.urlencoded({ extended: false }))  //urlencoded function gives us the middleware similar to one below, but it also parses the request body. though it does not parses files, json it can parse form data.
app.use(express.static(path.join(__dirname, 'public'))); // allow us to deliver static files(files that are not served through node.js but directly from file system to users) and grant only read-only access 
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash()); // allows to send a message whenever a user is redirecting to a specified web-page

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


//res.locals - The res.locals property is an object that contains response local variables scoped to the request and because of this, it is only available to the view(s) rendered during that request/response cycle (if any). 
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes); //filtering paths- only path that starts with '/admin' will be handled by this
app.use(shoproutes)
app.use(authRoutes);


// for all the requests which is not handled above
app.use(errorController.get404);

// app.listen(3000) // replaces below lines of code and does same
// const  server=http.createServer(app);
// server.listen(3000)

mongoose
  .connect(
    `mongodb+srv://${creds.dbCred.dbUser}:${creds.dbCred.dbPassword}@cluster0.u1u2jqj.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
