const express = require('express')
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose')
const app = express();
const port = 8000;


app.use(express.urlencoded());
app.use(cookieParser());

//use express router
app.use('/', require('./routes'));

//to set up our view engine
app.set('view engine','ejs')    
app.set('views' , './views')



app.listen(port, function(err){
    if(err){
        console.log(`error in running the server ${err}`);
    }
    console.log(`server is running on port ${port}`);
})