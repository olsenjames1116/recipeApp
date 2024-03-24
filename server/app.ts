import dotenv from 'dotenv';
import './utils/mongodb';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import userRouter from './routes/user';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for all routes.
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Direct to route files.
app.use('/api/user', userRouter);

// Generic error handler.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong');
});

// Listen on port when server is started.
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

export default app;
