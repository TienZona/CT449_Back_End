const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");
// connect database
const db = require("./app/models");
const Role = db.role;
const mongoose = require('mongoose');
  
async function startServer(){
    try {
        await mongoose.connect(config.db.uri);
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the Database!");
        // initial;
        const PORT = config.app.port;

        app.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (err){
        console.log("Cannot connect to the database!", err);
        process.exit();
    }
}

// function initial() {
//     // The estimatedDocumentCount() function is quick as it estimates the number of documents in the MongoDB collection. It is used for large collections because this function uses collection metadata rather than scanning the entire collection.
  
//     Role.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         new Role({
//           name: "user",
//         }).save((err) => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'user' to roles collection");
//         });
  
//         new Role({
//           name: "moderator",
//         }).save((err) => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'moderator' to roles collection");
//         });
  
//         new Role({
//           name: "admin",
//         }).save((err) => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'admin' to roles collection");
//         });
//       }
//     });
//   }

startServer();