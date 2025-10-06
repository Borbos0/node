require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('./middleware/cors');
const logger = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3005;
const HOST = process.env.HOST || '127.0.0.1';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/backend';

const app = express();

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.log('Сервер работает, но БД недоступна. Запустите MongoDB!');
  });

app.use(cors);
app.use(logger);
app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});