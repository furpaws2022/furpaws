import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import session from "express-session"
import passport from "passport"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(session({
    secret:"Furpaws secret key.",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/furpDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected...")
})


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
app.post("/login", (req, res,next)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    });
})

app.post("/register", (req, res)=> {
    
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    console.log(err);
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    });

})



app.listen(9002,() => {
    console.log("Backend started at port 9002")
})