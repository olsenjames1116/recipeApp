import passportGoogleOAth2, { VerifyCallback } from 'passport-google-oauth2';
import passport from 'passport';
import User from '../models/user';
import { Request } from 'express';

const GoogleStrategy = passportGoogleOAth2.Strategy;

// Use the production url if in production, otherwise use the development url.
const callbackURL = process.env.SERVER_URI
	? `${process.env.SERVER_URI}/api/user/auth/google/callback`
	: 'http://localhost:3000/api/user/auth/google/callback';

// Google strategy to authenticate users through Google OAuth.
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

			// If user is not found in db with input username, create a new user in the db.
			if (!user) {
				const newUser = new User({
					username: email,
				});

				await newUser.save();

				return done(null, newUser);
			} else {
				// A user exists. Pass on user object.
				return done(null, user);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async ({ _id }, done) => {
	// Retrieve user from db.
	const user = await User.findOne({ _id: _id });

	done(null, user);
});
