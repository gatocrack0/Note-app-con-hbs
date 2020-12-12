const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, {message: 'Not User Found'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) =>{
    User.findById(_id, (err, user) => {
        done(err, user);
    });
});

