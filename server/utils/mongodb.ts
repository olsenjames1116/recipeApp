import mongoose from 'mongoose';

// Set up mongoose connection.
mongoose.set('strictQuery', false);

// Set mongoDB connection string to production or development environment.
const mongoDB = process.env.PRODDB_URI || process.env.DEVDB_URI;

main().catch((err) => {
	console.log(err);
});
async function main() {
	if (mongoDB) await mongoose.connect(mongoDB);
}
