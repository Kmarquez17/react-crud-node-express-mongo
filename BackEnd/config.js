import mongoose from 'mongoose'

const DB_URL = process.env.MONGO_URI;
const PORT = process.env.PORT;

export default {
  connect: () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      DB_URL,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      },
      err => {
        let dbStatus = "";
        if (err) {
          dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`;
        }
        dbStatus = `*    DB Connection: OK\n****************************\n`;
        // if (process.env.NODE_ENV !== "test") {
          // Prints initialization
          console.log("****************************");
          console.log("*    Starting Server");
          console.log(`*    Port: ${PORT || 3000}`);
        //   console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`);
          console.log(`*    Database: MongoDB`);
          console.log(dbStatus);
        }
    //   }
    );    
  }
};

