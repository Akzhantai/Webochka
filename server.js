/*
const express =require("express");
const session = require('express-session');
const mongoose = require("mongoose");
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require("bcryptjs");
const app = express();

const UserModel = require("./models/User");
const MongoURI = "mongodb://localhost:27017/sessions"

mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(res => {
        console.log('MongoDb Connected')
    });

const store = new MongoDBSession({
    uri: MongoURI,
    collection: "MySessions",
});

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store,
}));

const isAuth = (req, res, next) =>{
   if(req.session.isAuth) {
       next()
   } else {
       res.redirect("/login");
   }
}

app.get("/", (req, res) => {
    res.render("landing");
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email});

    if(!user) {
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.redirect("/login");
    }
    req.session.isAuth = true
    res.redirect("/dashboard");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const {username, email, password} = req.body;

    let user = UserModel.findOne({email});

    if (user) {
        return res.redirect('/register');
    }

    const hashedPsw = await bcrypt.hash(password, 12);

    user = new UserModel({
        username,
        email,
        password: hashedPsw
    });

    await user.save();

    res.render("/login");
});

app.get("/dashboard", isAuth, (req, res) => {
    res.render("dashboard");
});

app.listen(3000, () => {
    console.log("App is listening on port http://localhost:3000");
});
*/