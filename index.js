
const path =require("path");
const express = require("express");
const mongoose =require("mongoose") 

const cookieParser =require('cookie-parser');
// routers
const userRouter = require('./routes/user');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");


//instance of express
const app = express();
const PORT =8000;

mongoose
.connect('mongodb://localhost:27017/blogify')
.then((e)=>console.log("mongodb connected"));





//configuration 
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));


//middleware to read form data 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get('/',(req,res)=>{
     res.render("home",{
        user:req.user
     });

});


app.use('/user',userRouter);// agr koi bhi request user se start hoti hai userRouter ko use karo


app.listen(PORT,()=>{
    console.log(`Server Started at PORT:${PORT}`);
})