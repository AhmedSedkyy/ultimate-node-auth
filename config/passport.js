const db = require('../models/database'); 
const passport = require('passport');
// config/passport.js
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User=db.User;


const options= {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const passportJwt = () => {
    passport.use(
        new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                const user = await User.findByPk(jwt_payload.user_id);
                if (user) 
                    return done(null, user);
                
                return done(null, false);
            } catch (err) {
                console.error(err);
                return done(err, false);
            }
        })
    );

    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/users/google/callback" 
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ where: { googleId: profile.id } });

                if (user) return done(null, user);

                user = await User.findOne({ where: { email: profile.emails[0].value } });

                if (user) {
                    user.googleId = profile.id;
                    user.provider = 'google';
                    await user.save();
                    return done(null, user);
                }

                const newUser = await User.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    provider: 'google',
                });

                return done(null, newUser);

            } catch (err) {
                console.error(err);
                return done(err, false);
            }
        }));
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name', 'displayName'] 
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ where: { facebookId: profile.id } });
            if (user) return done(null, user);

            const email = profile.emails ? profile.emails[0].value : null;
            
            if (email) {
                user = await User.findOne({ where: { email } });
                if (user) {
                    user.facebookId = profile.id;
                    user.provider = 'facebook'; 
                    await user.save();
                    return done(null, user);
                }
            }

            const newUser = await User.create({
                username: profile.displayName, 
                email: email || `fb_${profile.id}@no-email.com`,
                facebookId: profile.id,
                provider: 'facebook'
            });

            return done(null, newUser);

        } catch (err) {
            return done(err, false);
        }
    }));
};


module.exports = passportJwt;