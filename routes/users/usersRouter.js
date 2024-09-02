const express = require('express');
const { register, login, getProfile, blockUser, unblockUser, profileViewers } = require('../../controllers/users/usersCtrl');
const isLogin = require('../../middlewares/isLogin');
const usersRouter =express.Router()
// !Register
usersRouter.post('/register',register);
// Login
usersRouter.post('/login',login);
// profile
usersRouter.get('/profile',isLogin,getProfile);
// block user
usersRouter.put('/block/:userIdToBlock',isLogin,blockUser);
// unblock user
usersRouter.put('/unblock/:userIdToUnBlock',isLogin,unblockUser);
// unblock user
usersRouter.get('/profile-viewer/:userProfileId',isLogin,profileViewers);
// *Export
module.exports =usersRouter;