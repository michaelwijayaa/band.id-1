const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const expressValidator = require('express-validator');
const checkAuth = require('../middleware/check-auth');

router.use(expressValidator());
router.use(cookieparser());
router.use(session({ secret: 'my super secret',name: 'my-id', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());
//Bring in user model
let Users = require('../models/user');
let dbUsers = require('../models/databaseUser');
//Register form
router.get('/register',function(req,res){
    res.render('register');
    console.log(req.cookies['tokenJ']);
});

//Register Process
router.post('/register',function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const password2 = req.body.password2;
    
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is Not Valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
        console.log(errors);
    } else {
        let newUser = new Users({
            name:name,
            email: email,
            username: username,
            role: role,
            password: password
        });
        //Buat objek di node baru untuk keperluan Edit Profile
        let newUserProfile = new dbUsers({
            _id: newUser._id,
            user: newUser,
            genre: 'Pop',
            description: 'No Description',
            profilePicture: '',
            profileHeader: '',
            pastGig:''
        })
        // Save newUserProfile to DB
        newUserProfile.save();
        console.log(newUserProfile);
        //Encrypt Password
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash(newUser.password, salt, function(err,hash){
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    } else{
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

// Login form
router.get('/login',function(req,res){
    res.render('login');
});
// login process
router.post('/login',
passport.authenticate('local' , {failureRedirect:'/users/login', failureFlash: true}),
function(req, res) {
    if(req.isAuthenticated()){
    console.log(req.user);
    const token = jwt.sign({
        username: req.user.username,
        userId: req.user._id
    }, 'secret',{
        expiresIn: '5h',
    });
    res.send(token);
    res.cookie('tokenJ',token);
    console.log(token);
   res.redirect('/');
} else {
    res.redirect('/users/login');
}
});
//Logout
router.get('/logout',function(req,res){
    req.logout();
    console.log('Logged Out');
    res.redirect('/')
});

module.exports = router;


