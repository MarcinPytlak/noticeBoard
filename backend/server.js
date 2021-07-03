const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('mongoose');

// // const passport = require('passport');
// // //const GoogleStrategy = require('passport-google-oauth20').Strategy;
// // const session = require('express-session');

// const postsRoutes = require('./routes/posts.routes');

// const app = express();

// // passport.use(new GoogleStrategy({
// //   clientID: '791160165701-6ir9jvpkvigjlmktojidq9btm0bt53hk.apps.googleusercontent.com',
// //   clientSecret: 'mb2Z8z4eECkR0OdvFVoT0-u3',
// //   callbackURL: 'http://localhost:3000/homepage',
// // }, (accessToken, refreshToken, profile, done) => {
// //   done(null, profile);
// // }));



// // serialize user when saving to session
// // passport.serializeUser((user, serialize) => {
// //   serialize(null, user);
// // });

// // // deserialize user when reading from session
// // passport.deserializeUser((obj, deserialize) => {
// //   deserialize(null, obj);
// // });

// /* MIDDLEWARE */
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // app.use(session({ secret: 'anything' }));
// // app.use(passport.initialize());
// // app.use(passport.session());

// /* API ENDPOINTS */
// app.use('/api', postsRoutes);

// /* API ERROR PAGES */
// app.use('/api', (req, res) => {
//   res.status(404).send({ post: 'Not found...' });
// });
// // app.get('http://localhost:3000/auth/google',
// //   passport.authenticate('google', { scope: ['email', 'profile'] }));

// /* REACT WEBSITE */
// app.use(express.static(path.join(__dirname, '../build')));
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

// /* MONGOOSE */
// mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('Successfully connected to the database');
// });
// db.on('error', err => console.log('Error: ' + err));

// /* START SERVER */
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log('Server is running on port: '+port);
// });
