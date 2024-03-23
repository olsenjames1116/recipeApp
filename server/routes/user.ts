import express from 'express';
const router = express.Router();

// POST a new user when they sign up.
router.post('/sign-up', (req, res, next) => {
	console.log('sign up express');
	res.status(200).send('User sign up');
});

export default router;
