// Import required modules and packages
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { Users } = require('../models/users');

// Initialize Passport middleware
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    // Find the user by email in the database
    const user = await Users.findOne({ email });

    // If user not found or password is incorrect, return error message
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: 'Incorrect email or password' });
    }

    // Otherwise, return the authenticated user
    return done(null, user);
  } catch (err) {
    // If an error occurred, return it
    return done(err);
  }
}));

// Serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by ID in the database
    const user = await Users.findById(id);

    // If user not found, return error message
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // Otherwise, return the user
    return done(null, user);
  } catch (err) {
    // If an error occurred, return it
    return done(err);
  }
});

// Middleware function to authenticate requests
function authenticate(req, res, next) {
  // Use Passport to authenticate the request
  passport.authenticate('local', { session: true }, (err, user, info) => {
    // If an error occurred, return it
    if (err) {
      return next(err);
    }

    // If user not found or password is incorrect, return error message
    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    // Otherwise, log the user in and continue to the next middleware
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return next();
    });
  })(req, res, next);
}

// Middleware function to check if user is authenticated
function isAuthenticated(req, res, next) {
  // If user is authenticated, continue to the next middleware
  if (req.isAuthenticated()) {
    return next();
  }

  // Otherwise, return error message
  return res.status(401).json({ message: 'Unauthorized' });
}

// Middleware function to check if user is authorized
function isAuthorized(role) {
  // Return middleware function to check if user has the specified role
  return (req, res, next) => {
    // If user has the specified role, continue to the next middleware
    if (req.user.role === role) {
      return next();
    }

    // Otherwise, return error message
    return res.status(403).json({ message: 'Forbidden' });
  };
}

// Export the middleware functions
module.exports = {
  authenticate,
  isAuthenticated,
  isAuthorized,
};




// passport.use: Configures Passport to use the local authentication strategy. The function takes an email and password, and returns an authenticated user if the email and password match a user in the database.
// passport.serializeUser: Serializes the user for the session. The
// passport.serializeUser function is called when a user logs in and is used to save the user's unique identifier (typically the user ID) to the session. This makes it easy to retrieve the user's information for future requests without requiring the user to log in again. The serialized user ID is then stored in the session and can be retrieved later using passport.deserializeUser.
// In this implementation, the passport.serializeUser function takes a user object and a done callback function. The done function is called with a null error and the user's ID as the second argument. This ID is then stored in the session using a cookie or other mechanism.
// This serialized user ID is then stored in the session and can be retrieved later using passport.deserializeUser.