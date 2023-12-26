// server.js
require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const reviewRoutes = require('./routes/reviewRoutes');
const middleware = require('./middleware/middleware');

const app = express();

const port = process.env.PORT || 3001;
connectDB();

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.get('/', (req, res) => res.send('API Running!'));

// routes
app.use('/api/reviews', reviewRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
