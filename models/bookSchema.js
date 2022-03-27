const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    book:{
        type:String,
        required:true,
        trim:true},
    author:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    number:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    desc:{
        type:String,
    }       
})


const Books = new mongoose.model("books",bookSchema);

module.exports = Books;