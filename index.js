
const path =require("path");
const express = require("express");
const mongoose =require("mongoose") 
const cookieParser =require('cookie-parser');

const Blog =require("./models/blog");
// routers
const userRouter = require('./routes/user');
const blogRouter =require('./routes/blog');
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
app.use(cookieParser());// to parse to cookie
app.use(checkForAuthenticationCookie("token"));// to check authentication 
app.use(express.static(path.resolve('./public')));  

app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({});
    return res.render('home',{
        user: req.user,
        blogs: allBlogs
    });
})


app.use('/user',userRouter);// agr koi bhi request user se start hoti hai userRouter ko use karo
app.use('/blog',blogRouter);



app.listen(PORT,()=>{
    console.log(`Server Started at PORT:${PORT}`);
})