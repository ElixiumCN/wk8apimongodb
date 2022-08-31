const mongoose = require('mongoose')

const tvshowSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    actor: {
        type: String,
        default: "Not Specified",
    },
})

const TVShow = mongoose.model("NetflixTV", tvshowSchema);

module.exports = TVShow
//Mongoose is an Object Document Mapping
//organization or structure for a database 
//Essentially, mongoose is a library that allows you to pass documents to a DBMS
//defining the structure of your documents and the types of data you're storing
//Everything in Mongoose starts with a Schema. 
//Each schema maps to a MongoDB collection and 
//defines the shape of the documents within that collection.
