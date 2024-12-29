const mongoose = require('mongoose');

const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb Connected successfully");
    }catch(err)
    {
        console.log("Something went wrong", err);
        process.exit(1);
    }
}

module.exports = connectDb;