const express =require('express');
 const router = express.Router();
 const passport = require('passport');

const userController = require('../controller/user_controller')

    router.get('/profile',passport.checkAuthentication,userController.profile)

    router.get('/signin',userController.signIn)

    router.get('/signup',userController.signUp)
        
    router.post('/create',userController.create)

    //use passport as a middleware to authenticate
    router.post('/create-session',passport.authenticate(
        'local',
        {failureRedirect:'/users/signin'},
    ),userController.createSession)

    router.get('/sign-out', userController.destroySession)
 module.exports = router  