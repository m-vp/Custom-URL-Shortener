// db.js
const mongoose = require('mongoose');

exports.connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/url', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
