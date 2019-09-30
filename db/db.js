const mongoose = require('mongoose')
// const MONGODB_URL="mongodb+srv://farhan:admin@cluster0-mdz7y.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
