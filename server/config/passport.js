import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../models/User.js"; // своя модель

// console.log(process.env.JWT_SECRET);
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, // ключ для підпису
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            return done(null, { id: jwt_payload.sub, role: jwt_payload.role });
        } catch (err) {
            return done(err, false);
        }
    })
);


export default passport;
