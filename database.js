const mongoose = require('mongoose');

async function startServer() {
  try {
    await mongoose.connect('mongodb://localhost:27017/purchase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to the database');
});

mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});