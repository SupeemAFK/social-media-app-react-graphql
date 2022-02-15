const express = require('express');
const { 
    getSessionUser,
    signin, 
    signup, 
    oauthSignin, 
    signout, 
    forgotPassword, 
    resetPassword, 
    verifyEmail, 
    sendVerifyEmail, 
    changeEmail,
    changeUsername, 
    changePassword } = require('../controllers/auth')
    
const {
    generateTotpSecret,
    enable2FA,
    verifyTotp,
    invalidateTotpSecret, } = require('../controllers/totp')

const router = express.Router();

router.get('/get-session-user', getSessionUser)

router.post('/signin', signin)
router.post('/signup', signup)
router.post("/signout", signout);
router.post('/google', oauthSignin);

router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.post('/send-verify-email', sendVerifyEmail)
router.post('/verify-email', verifyEmail)

router.post('/change-email', changeEmail)
router.post('/change-username', changeUsername)
router.post('/change-password', changePassword)

router.post('/generate-totp-secret', generateTotpSecret)
router.post('/enable-2FA', enable2FA)
router.post('/verify-totp', verifyTotp)
router.post('/deactivate-2FA', invalidateTotpSecret)

module.exports = router