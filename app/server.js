const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // return instance of the app

// cors initialized for all requests
var corsOptions = {
    origin: '*', // cors enables for everywhere for now...
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors());

// Set up body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Setting up the dotnet config for .env
dotenv.config({ 
    path: './.env' // using environment variables
})

// Setting up the routing in a cool way
fs.readdirSync(`${__dirname}/routes`).map((file) => {
    require(`./routes/${file}`)(app)
})


// Is the server running???
app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    require('./utils/db') // This is the connection

    console.log('Server is now runnning on PORT ' + process.env.PORT + '.');
});