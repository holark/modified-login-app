const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Schema defination which also defines the shape of the documents within that collection
const userSchema = new Schema({
    name: { 
        type: String, 
        default: null 
    },
    address: { 
        type: String, 
        default: null 
    },
    email: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String 
    },
})

// to use our schema defination, we need to convert our userSchema ino a Model we can work with.
module.exports = mongoose.model('user', userSchema)