const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // dont know what this does
mongoose.connect(process.env.MONGODB_URI, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true,
}); // just some options to aviod warnings 

const connection = mongoose.connection; // !!!! We made a connection
connection.then((db) => {
    console.log('The MongoDB connection was successful.');
    console.log(`http://localhost:${process.env.PORT}/api/users`)
    return db;
}).catch((err) => { // :( No connection made
    console.log('There was an error conencting to the database:', err)
});