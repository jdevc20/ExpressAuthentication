const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/ExAuth';

mongoose.connect(MONGODB_URI, {
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = db;
