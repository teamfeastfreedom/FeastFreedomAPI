const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express(); // return instance of the app

// Set up body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Setting up the dotnet config
dotenv.config({ 
    path: './.env' // using environment variables
})

// Setting up the routing 
fs.readdirSync(`${__dirname}/routes`).map((file) => {
    require(`./routes/${file}`)(app)
})


// Is the server running???
app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }

    require('./utils/db')

    console.log('Server is now runnning on PORT ' + process.env.PORT + '.');
});