const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectionString = 'mongodb://mongo:27017/saylor'

const connectDB = async () => {
  try {
    let dbURL = process.env.MONGOURL;
    /**** dbURL = db.replace('[USERNAME]:[PASSWORD]', `${process.env.DBUSER}:${process.env.DBPASSWORD}`) */
    await mongoose.connect(
      connectionString,
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