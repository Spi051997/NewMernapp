const mongoose=require('mongoose');
var colors = require('colors');
const mongoAtlasUri =
  "mongodb+srv://admin:admin@cluster0.fb4an.mongodb.net/?retryWrites=true&w=majority";

  // console.log(mongoAtlasUri);

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected".red.underline),
  );
} catch (e) {
  console.log("could not connect");
}

 const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`.red.bgRed));
dbConnection.once("open", () => console.log(`Connected to DB!`.black.bgYellow)); 


module.exports=dbConnection;