const mongoose = require("mongoose");

async function connectToDb() {
  try{
    await mongoose.connect(process.env.DB_CONNECT).then(() => {
      console.log("Connected to db");
    }).catch((err) => {
      console.log("Error connecting to db", err);
    });

  }catch(err){
    console.log('err :',err)
    process.exit(1)
  }
  
    
    
}

module.exports = connectToDb;
