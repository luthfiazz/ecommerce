const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');
const passport = require('passport');
const {
    User
} = require('../db/models')


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'ecommerce.com';
opts.audience = 'ecommerce';


passport.use(new Strategy(opts, async (jwt_payload, done) => {

    try {
        const data = await User.findOne({
            where: {
                email: jwt_payload.email
            }
        })

        if (data) {
            return done(null, data);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}))

passport.serializeUser(function(User, done) {
    done(null, User.id);
  });
  
  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err,User) {
        done(err,User);
    });
  });

module.exports = passport;