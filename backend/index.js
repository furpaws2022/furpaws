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

mongoose.connect("mongodb://localhost:27017/furpawsDB", {
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
    const user = new User({
        username:email,
        password:password
    });

    req.login(user,function(err){
        if(err)
        {
            res.send({message:"login failed"});
        }else
        {
            res.send({message:"login successfull"});
        }
    });
})

app.post("/register", (req, res,next)=> {
    const { name, email, password} = req.body

    User.register({username:email,name:name},password,function(err,user){
        if(err){
            console.log(err);
            res.send({message:"Not successfull."});
        }
        else{
            passport.authenticate("local",(err, user, info) => {
                if (err) console.log(err);
                if (!user) res.send("No User Exists");
                else{
                    res.send({ message: "Successfully Registered, Please login now." });
                }
            })(req, res,next);

        }
    });

})

app.post("/status",(req,res)=>{
    if(req.isAuthenticated()){
        res.send({message:"Log Out"});
    }
    else
    {
        res.send({message:"LogIn"});
    }
});

app.listen(9002,() => {
    console.log("Backend started at port 9002")
})