const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/profiles', require('./controllers/profiles'));

app.use('/api/v1/transactions', require('./controllers/transactions'));
app.use('/api/v1/crypto', require('./controllers/crypto'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
