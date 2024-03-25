const redis = require('redis');

//Set up connection to Redis.

//This conditional allows for connection to a production build of Redis.
const client = process.env.REDIS_URL
	? redis.createClient({ url: process.env.REDIS_URL })
	: redis.createClient();

// Display meaningful messages to the console and connect to Redis.
client
	.on('connect', function () {
		console.log('Connected to Redis.');
	})
	.on('error', (err: Error) => console.log('Redis Client Error', err))
	.connect();

export default client;
