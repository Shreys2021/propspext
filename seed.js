const mongoose = require('mongoose');
const Questions = require('./models/Que');

mongoose.connect('mongodb://localhost:27017/pros-demo', {
    useNewUrlParser: true,

    useUnifiedTopology: true

}).then(() => {
    console.log("Connection open");
}).catch(err => {
    console.log("OH NO ERROR");
    console.log(err);
})

const Q = new Questions({
    Que: 'What do you understand by local and global scope of variables?'
})
Q.save().then(p => {
    console.log(p);
}).catch(e => {
    console.log(e);
})