const passport = require('passport');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const crypto = require('crypto');
const resetPasswordHtml = require('../email-templates/resetPassword')
const verifyEmailHtml = require('../email-templates/verifyEmail')
const sendmail = require('../utils/sendmail');
const redisClient = require('redis').createClient();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

function getSessionUser(req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).json({ user: req.user })
    }
    return res.status(401).json({ message: "Signin required" })
}

function signin(req, res) {
    passport.authenticate('local-signin', (err, user, info) => {
        if (err) return res.status(500).send();
        if (!user) return res.status(400).json({ message: info?.message });
        if (user.two_factor_enabled) return res.status(200).json({ is_two_factor_required: true, message: "2FA required" })
        req.logIn(user, () => res.status(200).json({ message: info?.message }));
    })(req, res);
}

function signup(req, res) {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) return res.status(500).send();
        if (!user) return res.status(400).json({ message: info?.message });
        req.logIn(user, () => res.status(200).json({ message: info?.message }));
    })(req, res);
}

async function oauthSignin(req, res) {
    const verify = await client.verifyIdToken({ idToken: req.body.tokenId, audience: process.env.GOOGLE_CLIENT_ID })
    const { email_verified, email, name, picture } = verify.payload

    if (!email_verified) {
        return res.status(401).json({ message: "Email is not verified" })
    }

    const user = await UserModel.findOne({ email })
    if (user) {
        if (user.two_factor_enabled) {
            return res.status(200).json({ is_two_factor_required: true, message: "2FA required" })
        }
        return req.logIn(user, () => res.status(200).json({ message: "Successfully signin" }))
    }

    const username = name.length > 10 ? name.slice(0, 10).replace(/ /g,'') + '_' + Math.random().toString(36).substr(2, 9) : name.replace(/ /g,'') + '_' + Math.random().toString(36).substr(2, 9)
    const newUser = await UserModel.create({ email: email, username: username, name: name, imageUrl: picture })

    req.logIn(newUser, () => res.status(200).json({ message: "Successfully signup" }))
}

function signout(req, res) {
    req.logout();
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.status(200).send({ message: "successfully signout" })  
    });
}

async function sendVerifyEmail(req, res) {
    const email = req.body.email;
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: "No user with that email" })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const tokenObj = { userId: user.id }
    redisClient.setex(`token:${token}`, 1800, JSON.stringify(tokenObj)) //30 minutes expires

    const options = {
        to: email, 
        subject: "Verify Email", 
        text: "click the link below to verify your email",
        html: verifyEmailHtml(`${process.env.CLIENT_URL}/verifyemail?token=${token}`, user.username)
    }
    await sendmail(options)
    return res.status(200).json({ message: "Success" })
}

async function verifyEmail(req, res) {
    const token = req.query.token
    const tokenObj = await getTokenObj(token)

    if (tokenObj) {
        const user = await UserModel.findById(tokenObj.userId)
        user.isVerified = true
        await user.save()

        redisClient.del(`token:${token}`)
        return res.status(200).json({ message: "Success" })
    }
}

async function forgotPassword(req, res) {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: "No user with that email" })
    }
  
    const token = crypto.randomBytes(32).toString('hex')
    const tokenObj = { userId: user.id }
    redisClient.setex(`token:${token}`, 1800, JSON.stringify(tokenObj)) //30 minutes expires
    
    const options = {
        to: user.email, 
        subject: "Reset Password", 
        text: "click the link below to reset your password",
        html: resetPasswordHtml(`${process.env.CLIENT_URL}/resetpassword?token=${token}`) 
    }
    await sendmail(options)
    return res.status(200).json({ message: "Success please check your mail box" })
}

async function resetPassword(req, res) {
    const token = req.query.token
    const tokenObj = await getTokenObj(token)

    if (tokenObj) {
        const newPassword = req.body.newPassword
        const hashNewPassword = await bcrypt.hash(newPassword, 12)
            
        const user = await UserModel.findById(tokenObj.userId)
        user.password = hashNewPassword
        await user.save()

        redisClient.del(`token:${token}`)
        return res.status(200).json({ message: "Success" })
    }
}

async function changeEmail(req, res) {
    const { newEmail, password } = req.body
    const isEmailUsed = await UserModel.exists({ email: newEmail })
    if (isEmailUsed) {
        return res.status(400).json({ message: "Email already used" })
    }

    const user = await UserModel.findById(req.user.id)
    const isValid = user?.password ? await bcrypt.compare(password, user.password) : false
    if (!isValid) {
        return res.status(400).json({ message: "Invalid password" })
    }    

    user.email = newEmail
    user.isVerified = false
    await user.save()
    return res.status(200).json({ message: "Success" })
}

async function changeUsername(req, res) {
    const { newUsername, password } = req.body
    const isUsernameUsed = await UserModel.exists({ username: newUsername })
    if (isUsernameUsed) {
        return res.status(400).json({ message: "Username already used" })
    }

    const user = await UserModel.findById(req.user.id)
    const isValid = user?.password ? await bcrypt.compare(password, user.password) : false
    if (!isValid) {
        return res.status(400).json({ message: "Invalid password" })
    }    

    user.username = newUsername
    await user.save()
    return res.status(200).json({ message: "Success" })
}

async function changePassword(req, res) {
    const { newPassword, password } = req.body

    const user = await UserModel.findById(req.user.id)
    const isNewPasswordSame = user?.password ? await bcrypt.compare(newPassword, user.password) : false
    const isValid = user?.password ? await bcrypt.compare(password, user.password) : false
    
    if (!isValid) {
        return res.status(400).json({ message: "Invalid password" })
    }

    if (isNewPasswordSame) {
        return res.status(400).json({ message: "Cannot change the same password" })
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 12)
    user.password = hashNewPassword
    await user.save()
    return res.status(200).json({ message: "Success" })
}

//redis get key function
function getTokenObj(token) {
    return new Promise((resolve, reject) => {
        redisClient.get(`token:${token}`, (error, token) => {
          if(error){
            reject(error);
          }
          resolve(JSON.parse(token));
        });
    });
}

module.exports = { 
    getSessionUser,
    signin, 
    signup, 
    oauthSignin, 
    signout, 
    forgotPassword, 
    resetPassword, 
    verifyEmail, 
    sendVerifyEmail,
    changeUsername,
    changeEmail,
    changePassword,
}