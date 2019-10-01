const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        device_type:{
            type: String
        },
        token: {
            type: String,
            required: true,
        }
    }]
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function(device_type) {
    // Generate an auth token for the user
    const user = this
    console.log("inside genauth")
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({device_type,token})
    await user.save()
    return device_type,token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}



userSchema.methods.updateUser = async function(id,body) {
    // Update user profile
    mongoose.set('useFindAndModify', false);
    const user = await User.findByIdAndUpdate(id,body,function(err,res){
        if(err) 
        throw new Error(err)
        else
        return res
    })
    return user
}
userSchema.statics.updateById= async function(id) {
    const user= await User.findByIdAndUpdate(id,req.body, function(err,res){
        if(!err) 
        res.status(200).send("profile updated successfully")
        else
        res.statics(500).send("failde to update record")
    })
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User