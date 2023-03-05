/*************************************************************************************
* WEB322 - 2231 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Jasprit Kaur
* Student ID    : 142774215
* Course/Section: WEB322 ZBB
*
**************************************************************************************/



import express from 'express';
import { engine  } from 'express-handlebars';
import { getRentalsByCityAndProvince, getFeaturedRentals } from "./Data Module/rentals-db.js";

const app = express();


app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('images'))
app.use(express.static('css'))


app.get('/', function (req, res) {
  res.render('home', {
    featuredRentals: getFeaturedRentals()
  });
});

app.get('/rentals', function (req, res) {
  res.render('rentals', {
    rentalsByCity: getRentalsByCityAndProvince()
  });
});

app.get('/sign-up', function (req, res) {
  res.render('sign-up', {
    title: 'Sign Up'
  });
});

app.get('/log-in', function (req, res) {
  res.render('log-in', {
    title: 'Log In'
  });
});





// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);

