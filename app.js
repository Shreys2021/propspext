const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');


const Question = require('./models/Que');
const { createSecretKey } = require('crypto');
const User = require('./models/user');
const passport = require('passport');
const localStrategy = require('passport-local');
const flash = require('connect-flash');


mongoose.connect('mongodb://localhost:27017/pros-demo', {
    useNewUrlParser: true,

    useUnifiedTopology: true

}).then(() => {
    console.log("Connection open");
}).catch(err => {
    console.log("OH NO ERROR");
    console.log(err);
})


app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
app.use(flash());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/Questions', async (req, res) => {
    // if (!req.isAuthenticated()) {
    //     // req.flash('error', 'you must be signed in');
    //     res.redirect('/login');
    // }
    const Questions = await Question.find({});
    //res.send(Questions)
    res.render('que', { Questions });
})

app.get('/AskQue', (req, res) => {
    res.render('Ask');
})

app.post('/AskQue', async (req, res) => {
    const Questions = new Question(req.body);
    await Questions.save();
    res.redirect('/Questions');
})

app.get('/register', async (req, res) => {
    res.render('user/register');
})

app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password)
        res.redirect('/Questions');
    } catch (e) {
        res.send(e);
        res.redirect('/register');
    }
})


app.get('/login', (req, res) => {
    res.render('user/login');
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), async (req, res) => {
    res.redirect('/Questions');
})

app.get('/logout', (req, res) => {
    res.logout();
    res.redirect('/Questions')
})


app.all('*', (req, res, next) => {
    res.send("NO PAGE FOUND");

})

app.listen(3000, () => {
    console.log("listening on port 3000");
})