import dotenv from 'dotenv';
dotenv.config();
import './utils/mongodb';
import './utils/googleAuth';
import './utils/auth';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
const MemoryStore = require('memorystore')(session);

import userRouter from './routes/user';
import ingredientsRouter from './routes/ingredients';

export const app = express();
const port = process.env.PORT || 3000;
app.set('trust proxy', 1);

// Apply rate limit to all requests.
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 30,
});

app.use(limiter);
app.use(helmet());
app.use(compression());

// Sets up a session for passport.
app.use(
	session({
		cookie: {
			maxAge: 86400000,
			secure: process.env.NODE_ENV === 'production' ? true : 'auto',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		},
		store: new MemoryStore({
			checkPeriod: 86400000,
		}),
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: true,
	})
);

// CORS settings.
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'http://localhost:3000',
			'https://whisk-recipes.com',
		],
		credentials: true,
	})
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Direct to route files.
app.use('/user', userRouter);
app.use('/ingredients', ingredientsRouter);

// Generic error handler.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong');
});

// Listen on port when server is started.
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		const url =
			process.env.NODE_ENV === 'production'
				? 'https://api.whisk-recipes.com'
				: `http://localhost:${port}`;
		console.log(`Server running at ${url}`);
	});
}

export default app;
