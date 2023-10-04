// Import the mongoose library for MongoDB connection
import mongoose from 'mongoose';

// Create a variable to track the connection status, initially set to false
let isConnected = false;

// Define a function to connect to the MongoDB database
export const connectToDB = async () => {

  // Set a mongoose option to enable strict mode for queries
  mongoose.set('strictQuery', true);

  // Check if the MongoDB URI is defined in the environment variables
  if (!process.env.MONGODB_URI) {
    return console.log('MongoDB_URI is not defined');
  }

  // Check if a connection is already established, and if so, return a message
  if (isConnected) {
    return console.log('=> Using existing database connection');
  }

  try {

    // Attempt to connect to the MongoDB database using the provided URI
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true; // Set isConnected to true to indicate a successful connection

    console.log('Connected to MongoDB'); // Log a success message
  } catch (error) {
    console.log(error); // Log any errors that occur during the connection attempt
  }
}
