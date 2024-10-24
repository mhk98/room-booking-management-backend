
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Databse Connected Successfully!!");    
    }).catch(err => {
        console.log('Could not connect to the database', err);
        process.exit();
    });
}

module.exports = dbConnect