const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const passport = require('passport');

module.exports = (req,res,next) =>
{
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login')
    }
}