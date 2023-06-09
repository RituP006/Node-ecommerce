// import express
const express = require('express');
const bodyparser = require('body-parser')  // parse the incoming requests body
const path = require('path')

const app = express();

// set a global configuration value for view engine and views
app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')

const shoproutes = require('./routes/shop')

const errorController=require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

app.use(bodyparser.urlencoded({ extended: false }))  //urlencoded function gives us the middleware similar to one below, but it also parses the request body. though it does not parses files, json it can parse form data.

app.use(express.static(path.join(__dirname, 'public'))); // allow us to deliver static files(files that are not served through node.js but directly from file system to users) and grant only read-only access 


app.use((req, res, next) => {
  User.findById('647f6592f74e2a51accdd20d')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes); //filtering paths- only path that starts with '/admin' will be handled by this
app.use(shoproutes)


// for all the requests which is not handled above
app.use(errorController.get404);

// app.listen(3000) // replaces below lines of code and does same
// const  server=http.createServer(app);
// server.listen(3000)


mongoConnect(() => {
    console.log("COnnected!");
    app.listen(3000);
  });
  