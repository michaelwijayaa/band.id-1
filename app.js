const express = require('express')
const app = express();
const path = require('path');
const morgan = require('morgan')
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const checkAuth = require('./api/middleware/check-auth')

const eventsRoute = require('./api/routes/events');
const applyRoute = require('./api/routes/applies');
const usersRoute = require('./api/routes/users');
const profileRoute = require('./api/routes/profile');

mongoose.connect("mongodb+srv://admin:admin@bandid-2hi2k.mongodb.net/test?retryWrites=true", {useNewUrlParser: true})
mongoose.Promise = global.Promise;
//load view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine' , 'pug');

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET')
        return res.status(200).json({})
    }
    next()
});
//Express Session
app.use(session({
    secret: 'halo',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true}
}));

//Passport config
require('./api/config/passport')(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

mongoose.Promise = global.Promise;

app.use('/events', eventsRoute)
app.use('/apply/', applyRoute)
app.use('/users/', usersRoute);
app.use('/profile/', profileRoute);
//Home Route
app.get('/',checkAuth, function(req,res){
    // console.log(req.headers.authorization);
        res.render('index');
        // console.log(req.user);
        // console.log(req.isAuthenticated());
    
    });
app.post('/', checkAuth, function(req,res){
    res.json({
        message:'Auth Success'
    })
})
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`))