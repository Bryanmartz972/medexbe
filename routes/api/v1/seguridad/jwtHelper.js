const passport = require("passport");
const passportJWT = require('passport-jwt')
const extractJWT = passportJWT.extractJWT;
const strategyJWT = passportJWT.Strategy

passport.use(
  new strategyJWT(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (payload, next) => {
      return next(null, payload);
    }
  )
)

module.exports = { passport, jwtMiddleWare: passport.authenticate('jwt', {session: false}) }