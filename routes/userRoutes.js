const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport')




router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/profile', passport.authenticate('jwt', { session: false }), userController.profile);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), userController.socialCallback);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),   userController.socialCallback);


module.exports = router;