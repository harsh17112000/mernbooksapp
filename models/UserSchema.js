const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    cpassword: {
        type: String,
        required: true,
        unique: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});


// password hash
userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});




// token generate
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id },process.env.SECRET_KEY,{
            expiresIn:"14d"
        });
        this.tokens = this.tokens.concat( {token:token} );
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
};


const USERS = new mongoose.model("users", userSchema);


module.exports = USERS;