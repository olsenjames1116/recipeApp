import passportGoogleOAth2, { VerifyCallback } from 'passport-google-oauth2';
import passport from 'passport';
import User from '../models/user';
import { Request } from 'express';

const GoogleStrategy = passportGoogleOAth2.Strategy;

const callbackURL = process.env.SERVER_URI
	? `${process.env.SERVER_URI}/api/user/auth/google/callback`
	: 'http://localhost:3000/api/user/auth/google/callback';

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: callbackURL,
			passReqToCallback: true,
		},
		async (
			req: Request,
			accessToken: string,
			refreshToken: string,
			profile: any,
			done: VerifyCallback
		) => {
			const { email } = profile;

			const user = await User.findOne({ username: email });
			if (!user) {
				const newUser = new User({
					username: email,
				});

				await newUser.save();

				return done(null, newUser);
			} else {
				return done(null, user);
			}
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user: any, done) {
	console.log(`deserialize: ${user}`);

	done(null, user);
});
