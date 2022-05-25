const mongoose = require('mongoose');
//the link should never include anything after 
const mongoURI ="mongodb+srv://jupiter:jupiter1234@inotebook-database.mlhpl.mongodb.net/iNotebook"
// ["..majority/inotebook"] = these is a error!

    
    const connectToMongo = () => {
        mongoose.connect(mongoURI ,()=>{
            console.log("connected to mongoose successfully");
        })
    }
module.exports = connectToMongo;