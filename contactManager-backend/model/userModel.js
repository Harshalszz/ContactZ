const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the contact name"]
    },
    email:{
        type:String,
        required:[true,"Please enter the contact email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter the contact phone"]
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema);