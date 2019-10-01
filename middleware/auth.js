const jwt = require('jsonwebtoken')
const User = require('../models/UsersModel')
// const JWT_KEY= "WinterIsComingGOT2019"
const auth = async (req, res, next) => {
    
    if (!req.header('Authorization')) {
        res.status(401).send({ error: 'You are not authorized to access this resource' })
    } else {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY, function(err, res){if(err) return err; else return res})
       
        try {
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) {
                res.status(401).send({ error: 'Not authorized to access this resource' })
            }
            req.user = user
            req.token = token
            next()
        } catch (error) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }
    }

}
module.exports = auth