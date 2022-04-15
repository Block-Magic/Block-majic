const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const cookie = req.cookies[`${process.env.COOKIE_NAME}`];
    const payload = jwt.verify(cookie, `${process.env.JWT_SECRETS}`);

    req.user = payload;
    next();
  } catch(error) {
    error.message = 'You must be signed in';
    error.status = 401;

    next(error);
  }
};
