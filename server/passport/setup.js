const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = process.env.SECRET_KEY;
    opts.usernameField =  "email"
    // JWT Strategy
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            try {
                // Match User
                User.findOne({ email: jwt_payload.attributes.email })
                    .then(user => {
                        // Create new User
                        if (!user) {
                            return done(null, false, { message: "Not a Valid User" });
                        } else {
                            // Match password
                            bcrypt.compare(password, user.password, (err, isMatch) => {
                                if (err) throw err;
                                if (isMatch) {
                                    return done(null, user);
                                } else {
                                    return done(null, false, { message: "Wrong password" });
                                }
                            });
                        }
                    })
                    .catch(err => {
                        return done(null, false, { message: err });
                    });
            } catch(error) {
                console.log(error);
                return done(null, false, { message: err });
            }
        })
    );
};
