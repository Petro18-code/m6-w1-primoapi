import AuthorR from "../models/AuthSchema.js";
import jwt from "jsonwebtoken";
import GoogleStrategy from "passport-google-oauth20";
import 'dotenv/config';

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`,
  },

 async function (accessToken, refreshToken, profile, passportNext) {
        const {
            given_name: firstname,
            last_name: surname,
            email,
            sub: googleid,
            picture: avatar
        } = profile._json

        let user = AuthorR.findOne({googleid})
        
        if (!user) {
            const newUser = new AuthorR({
                googleid,
                firstname,
                surname,
                email,
                avatar
            })

            user = await newUser.save()
        }

        jwt.sign(
            {authorId: user.id},
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            },
            (err, jwtToken) =>{
                if (err) return res.status(500).send();
                return passportNext(null, { jwtToken })
            }
        )
    });

export default googleStrategy;
