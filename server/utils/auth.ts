import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user';

const LocalStrategy = passportLocal.Strategy;

// Local strategy to authenticate users through the client log in form.
passport.use(
	new LocalStrategy(async (username, password, done) => {
		const user = await User.findOne({ username: username });
		console.log('localStrat');

		// If a user is not found in the db with the input username, return an error.
		if (!user) {
			return done(null, false, {
				message: `Username "${username}" does not exist.`,
			});
		}

		try {
			// If input and stored passwords do not match, return an error.
			if (await bcrypt.compare(password, user.password)) {
				// Passwords match. Pass on user object.
				return done(null, user);
			} else {
				return done(null, false, { message: 'Invalid password.' });
			}
		} catch (error) {
			// A  for errors with bcrypt.
			return done(error);
		}
	})
);

passport.serializeUser((user, done) => {
	console.log('serializeUser');
	done(null, user);
});
passport.deserializeUser(async ({ _id }, done) => {
	console.log('deserializeUser');
	// Retrieve user from db.
	const user = await User.findOne({ _id: _id });

	done(null, user);
});
