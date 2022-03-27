const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Books = require("../models/bookSchema");
const USERS = require("../models/UserSchema");
const Authnetication = require("../middleware/Authentication");

// mailer services



// post book data

router.post("/bookadd", async (req, res) => {
    console.log(req.body);
    try {
        const { book, author, price, username, email, number, desc } = req.body;
     

        if (!book || !author || !price || !username || !email || !number || !desc) {
            res.status(422).json({ message: "fill the all data" })
        } else {

            const AddData = new Books({
                book, author, price, username, email, number, desc
            });

            await AddData.save();

            res.status(201).json(AddData);

        }
    } catch (error) {
        res.status(422).json({ message: "invalid data" })
    }
});


// get books details
router.get("/getbook", async (req, res) => {
    try {
        const GetBook = await Books.find();
        res.status(201).json(GetBook)
    } catch (error) {
        res.status(422).json({ message: "invalid data" })
    }
});



// get individual books details
router.get("/getbookone/:id", async (req, res) => {

    const { id } = req.params;
    try {
        const GetBook = await Books.findById({ _id: id });
        res.status(201).json(GetBook)
    } catch (error) {
        res.status(422).json({ message: "invalid data" })
    }
});



// update book details

router.patch("/updatebook/:id", async (req, res) => {
    try {

        const { id } = req.params;

        // console.log(id)

        const { book, author, price, username, email, number, desc } = req.body;

        if (!book || !author || !price || !username || !email || !number || !desc) {
            res.status(422).json({ message: "fill the all data" })
        } else {

            const AddData = await Books.findByIdAndUpdate({ _id: id }, req.body, {
                new: true
            });

            res.status(201).json(AddData);

        }

    } catch (error) {
        res.status(422).json({ message: "invalid data" })
    }
});




// delete books details

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
      
        const deletebooks = await Books.findByIdAndDelete({ _id: id });
       
        res.status(201).json(deletebooks);
    } catch (error) {
        res.status(422).json({ message: "invalid data" })
    }
});



// user api
// regiseter user Data

router.post("/register", async (req, res) => {


    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ message: "fill the all details details" })
    }


    try {
        const validUser = await USERS.findOne({ email: email });
        // console.log(validUser);

        if (validUser) {
            res.status(422).json({ message: "This User is already registerd" })
        } else if (password !== cpassword) {
            res.status(422).json({ message: "password and cpassword are not matched" })
        } else {
            const registeruser = new USERS({
                fname, email, password, cpassword
            });

            // here password bcrypt

            await registeruser.save();

            res.status(201).json(registeruser)

        }

    } catch (error) {
        res.status(422).json({ message: "fill the all details details" })
    }
});




// login user api
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ message: "fill the all details details" })
    }

    try {
        const verifyUser = await USERS.findOne({ email: email });

        if (!verifyUser) {
            res.status(422).json({ message: "This Is invalid email" });
        } else {
            const userpass = await bcrypt.compare(password, verifyUser.password);

            if (!userpass) {
                res.status(422).json({ message: "invalid details" });
            } else {
                // call token
                const token = await verifyUser.generateAuthToken();
                // console.log(token + "token malyu 6");

                const option = {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                }

                // create cookie
                res.cookie("books", token, option);

                res.status(201).json(verifyUser);
               
            }
        }


    } catch (error) {
        res.status(422).json({ message: "invalid details" })
    }
});



// get user details

router.get("/validuserdata", Authnetication, async (req, res) => {
    try {
     
        const valid = await USERS.findOne({ _id: req.userID });
       
        res.status(201).json(valid);
        console.log(valid);
        
    } catch (error) {
        res.status(422).json({ message: "invalid details" })
    }
});



// user logout

router.get("/logout", Authnetication, (req, res) => {

    console.log("this is my logout page" + req.token);
    // console.log("this is my logout page ka full token" + req.rootUser.tokens);
    req.rootUser.tokens = req.rootUser.tokens.filter((currElement) => {
        return currElement.token !== req.token
    });
    res.clearCookie("books", { path: "/" });
    res.status(201).send(req.rootUser);

});




module.exports = router;