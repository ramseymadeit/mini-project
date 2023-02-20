const express = require("express")
const mongoose = require("mongoose")
const DB_URL = "mongodb+srv://alstephens:stephens03@cluster0.u0rsbfi.mongodb.net/?retryWrites=true&w=majority"
const User = require('./studentsmodule/module');
const bodyParser = require('body-parser')
const router = express()
const PORT = process.env.PORT || 2000

router.use(bodyParser.json());

mongoose.connect(DB_URL).then(
    function(){
        console.log("Database is connected")
    }
).
catch(
    function(){
        console.log("Database connection error!")
    }
)

//Get user data from database
router.get('/users', async (req, res) => {
    try{
        const user = await User.find();
        res.send(user);
    }catch (error) {
        res.send(error);
    }
});
//Get user data from database using user id
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id});
        if(!user){
            res.send("User information not found!");                
        }
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//Add user information to database
router.post("/add", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

//Running application at localhost:2000
router.listen(PORT, function (){
    console.log("router is running on port 2000")

    
})