const mongoose = require('mongoose');

// const db = mongoose.connect('mongodb://127.0.0.1:27017/testing_codeial').then(()=>{
//     console.log('connected to database');
// })
// .catch((err)=>{
//     console.log(err);
// })


mongoose.connect('mongodb://127.0.0.1:27017/testing_codeial');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;