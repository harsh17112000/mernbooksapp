require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const Books = require("./models/bookSchema");
const USERS = require("./models/UserSchema");
const router = require("./Routes/router");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieparser(""));
app.use(cors());
app.use(router)
const port = 8000


if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}


app.listen(port,()=>{
    console.log(`server is start ${port}`);
})