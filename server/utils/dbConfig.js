const mongoose = require('mongoose');
export async function connect(){
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/app");
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('Connected to MongoDB');
        })
        connection.on('error', (error)=>{
            console.log('Failed to Connect MongoDB. please make sure MongoDB is running' + error.message);
            process.exit();
        })
    } catch (error) {
        console.log('something went wrong');
        console.log(error);
        
    }
}