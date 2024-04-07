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

import userRouter from './routes/user';
import ingredientsRouter from './routes/ingredients';

const app = express();
const port = process.env.PORT || 3000;
app.set('trust proxy', 1);

// Apply rate limit to all requests.
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 20,
});

// Middleware for all routes.
app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(
	session({
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'http://localhost:3000',
			process.env.CLIENT_URI!,
			process.env.SERVER_URI!,
		],
		credentials: true,
	})
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Direct to route files.
app.use('/api/user', userRouter);
app.use('/api/ingredients', ingredientsRouter);

// Generic error handler.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong');
});

// Listen on port when server is started.
app.listen(port, () => {
	const url = process.env.SERVER_URI
		? process.env.SERVER_URI
		: `http://localhost:${port}`;
	console.log(`Server running at ${url}`);
});

export default app;
