const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    let dbURL = process.env.MONGOURL;
    /**** dbURL = db.replace('[USERNAME]:[PASSWORD]', `${process.env.DBUSER}:${process.env.DBPASSWORD}`) */
    await mongoose.connect(
      dbURL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource:"admin",
        ssl: true,
    }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;