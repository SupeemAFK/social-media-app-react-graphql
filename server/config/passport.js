const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');
require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id).select('-password');
    done(null, user);
});

//local-signup
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const emailExists = await UserModel.exists({ email })
    const usernameExists = await UserModel.exists({ username: req.body.username })

    if (emailExists) {
        return done(null, false, { message: "Already have user with that email" })
    }

    if (usernameExists) {
        return done(null, false, { message: "Already have user with that username" })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await UserModel.create({ 
        email, 
        username: req.body.username, 
        name: req.body.name, 
        password: hashPassword 
    })
    return done(null, newUser, { message: "Successfully signup" })
}));

//local-signin
passport.use('local-signin', new LocalStrategy({
    usernameField: 'credentials',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, credentials, password, done) => {
    const user = await UserModel.findOne({$or: [{ email: credentials },{ username: credentials }]})
    if (!user) {
        return done(null, false, { message: "No user with that credentials" })
    }

    const isCorrectPassword = user?.password ? await bcrypt.compare(password, user.password) : false
    if (!isCorrectPassword) {
        return done(null, false, { message: "Invalid password" })
    }
    
    user.lastSignedIn = Date.now()
    await user.save()
    return done(null, user, { message: "Successfully signin" })
}));
