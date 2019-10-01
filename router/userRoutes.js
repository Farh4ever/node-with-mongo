const express = require('express')
const User = require('../models/UsersModel')
var device = require('express-device');
const router = express.Router()
const auth = require('../middleware/auth')
var d= express()
d.use(device.capture())
router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const device_type = req.device.type.toUpperCase()
        const user = new User(req.body)
        console.log(req.body)
        await user.save()
        console.log(device_type)
        const token = await user.generateAuthToken(device_type)
        res.status(201).send({ user, device_type, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.status(200).send(req.user)
})

router.post('/users/me/update', auth, async(req, res) => {
    // Update logged in user profile
        const user = new User()
        const update = await user.updateUser(req.user._id,req.body)
        res.status(200).send(update)
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send("successfully logged out...")
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.status(200).send("successfully logged out from all devices...")
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
