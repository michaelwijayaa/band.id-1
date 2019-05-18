const express = require('express');
const router = express.Router();
const session = require('express-session');
const checkAuth = require('../middleware/check-auth');
const expressValidator = require('express-validator');
const passport = require('passport');
const local = require('passport-local');

//Bring in user model
let Users = require('../models/user');
let dbUsers = require('../models/databaseUser');

router.get('/', checkAuth,function(req,res){   
    dbUsers.findById(req.user._id, function(err, userprofile){
        if(err){
            console.log(err);
        } else{
            res.json({
                user:req.user,
                userDb: userprofile
            })
        }
    });
});

//Load Edit profile form
router.get('/edit', checkAuth, function(req,res){
    dbUsers.findById(req.users._id, function(err,userprofile){
        if(err){
            console.log(err)
        } else{
            res.json({
                //untuk ditaro di edit form
                userDb: userprofile
            })
        }
    })
});

router.post('/edit', checkAuth, function(req,res){
    let newProfile = {};
    newProfile.genre = req.body.genre;
    newProfile.description = req.body.description;
    newProfile.profilePicture = req.body.profilePicture;
    newProfile.profileHeader = req.body.profileHeader;
    newProfile.pastGig = {
        gigName: req.body.gigName,
        date: req.body.date
    }

    let query = {_id:req.user._id}
    userDb.update(query, newProfile,function(err){
        if(err){
            console.log(err);
            return
        } else {
            res.redirect('/');
        }
    })
})
        
module.exports = router;