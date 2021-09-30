require('dotenv').config()
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL_TEST;
// const MONGO_URL = "mongodb+srv://toddcford:&*((*&112358T@cluster0.j4byq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
console.log(MONGO_URL);

const options = {
  useNewUrlParser: true,
};

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGO_URL, options);
    console.log("connected to MongoDB!!")
  } catch(e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer 