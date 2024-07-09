const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const adminrout = require('./route/admin');

//express app 
const app = express();

// calling static files 
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "images")));

//view engine
app.set('view engine', 'ejs');


const connString = 'mongodb+srv://goftanbonkeno:0gNx0U1ep4I2FF5P@newnodeexpressprojects.wi932yf.mongodb.net/'

app.use(bodyParser.urlencoded({ extended: false }));





//routes
app.use(adminrout);


//connection
mongoose.connect(connString)
.then(result =>{
    console.log('connected !!')
    app.listen('3000');
})
.catch(err =>{
    console.log(err);
})



