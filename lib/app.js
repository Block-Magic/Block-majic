const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
// App routes
app.use('/api/v1/users', require('./controllers/users'));
<<<<<<< HEAD
=======
app.use('/api/v1/profiles', require('./controllers/profiles'));

app.use('/api/v1/transactions', require('./controllers/transactions'));
>>>>>>> 8cc67a3f65a8ee53260fb7b3a141ccb98970bbdc
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
