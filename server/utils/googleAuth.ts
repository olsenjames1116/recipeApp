import passportGoogleOAth2 from 'passport-google-oauth2';
import passport from 'passport';
import User from '../models/user';

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
		function (
			request: any,
			accessToken: any,
			refreshToken: any,
			profile: { id: any },
			done: (arg0: any, arg1: any) => any
		) {
			console.log('google strategy');
			return done(null, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user: any, done) {
	User.findById(user._id, function (err: any, user: any) {
		done(err, user);
	});
});
