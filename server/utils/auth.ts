import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user';
const LocalStrategy = passportLocal.Strategy;

passport.use(
	new LocalStrategy(async (username, password, done) => {
		const user = await User.findOne({ username: username });

		if (!user) {
			return done(null, false, {
				message: `Username "${username}" does not exist.`,
			});
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Invalid password.' });
			}
		} catch (error) {
			return done(error);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser(async ({ _id }, done) => {
	const user = await User.findOne({ _id: _id });

	done(null, user);
});
