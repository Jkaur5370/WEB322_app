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
import { engine } from 'express-handlebars';
import { getRentalsByCityAndProvince, getFeaturedRentals } from "./Data Module/rentals-db.js";
import * as dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('images'))
app.use(express.static('css'))
app.use(express.static('js'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('home', {
    featuredRentals: getFeaturedRentals()
  });
});
app.get('/welcome', function (req, res) {
  res.render('welcome', {
    isUser: true
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
app.post('/sign-up', function (req, res) {
  const fName = req?.body?.fName;
  const lName = req?.body?.lName;
  const email = req?.body?.email;
  const password = req?.body?.password;
  var emailError = ""
  var passwordError = ""
  var fNameError = ""
  var lNameError = ""
  if (!fName) {
    fNameError = 'First name is required';
  }
  if (!lName) {
    lNameError = 'Last name is required';
  }
  if (!email) {
    emailError = 'Email is required';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    emailError = 'Invalid email format';
  }
  if (!password) {
    passwordError = 'Password is required';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,12}$/.test(password)) {
    passwordError = 'Password must be between 8 to 12 characters and contain at least one lowercase letter, uppercase letter, number, and symbol';
  }
  if (emailError == "" && passwordError == "" && fNameError == "" && lNameError == "") {
    const msg = {
      to: email,
      from: 'Jaspritk246701@gmail.com',
      subject: `Welcome to Renttastic, ${fName}`,
      text: `Dear ${fName + " " + lName},\n\nI am delighted to welcome you to Renttastic. Thank you for joining our us!!\n\nIf you have any questions or feedback, please do not hesitate to reach out to me or our support team.\n\nBest regards,\nJasprit Kaur,\nRenttastic`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("sgMail then");
      }, error => {
        console.error("sgMail err", error);

        if (error.response) {
          console.error(error.response.body)
        }
      });
    res.send({
      status: 200,
      message: "success !!"
    });
  } else {
    res.send({
      status: 400,
      fName: fNameError,
      lName: lNameError,
      email: emailError,
      password: passwordError,
    });
  }
})
app.get('/log-in', function (req, res) {
  res.render('log-in', {
    title: 'Log In'
  });
});

app.post('/log-in', function (req, res) {
  const email = req?.body?.email;
  const password = req?.body?.password;
  var emailError = ""
  var passwordError = ""
  if (!email) {
    emailError = 'Email is required';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    emailError = 'Invalid email format';
  }
  if (!password) {
    passwordError = 'Password is required';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,12}$/.test(password)) {
    passwordError = 'Password must be between 8 to 12 characters and contain at least one lowercase letter, uppercase letter, number, and symbol';
  }
  if (emailError == "" && passwordError == "") {
    res.send({
      status: 200,
      message: "success !!"
    });
  } else {
    res.send({
      status: 400,
      message: "error !!",
      email: emailError,
      password: passwordError,
    });
  }
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
});
const HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}
app.listen(HTTP_PORT, onHttpStart);

