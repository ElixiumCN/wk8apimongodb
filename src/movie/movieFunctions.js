const Movie = require("./movieModel")

// [C] Creates
exports.createM = async (movieObj) => {
    try {
        await Movie.create(movieObj)
    } catch (error) {
        console.log("Error in createM function.")
        console.log(error)
    }
}

// [R] List all
exports.listM = async () => {
    try {
        return await Movie.find({})
    } catch (error) {
        console.log("Error in listM function.")
        console.log(error)
    }
}

// [U] Updates specified
exports.updateM = async (movieObj, updateMovieObj) => {
    try {
        return await Movie.updateOne(movieObj, updateMovieObj)
    } catch (error) {
        console.log("Error in updateM function.")
        console.log(error)
    }
}

// [D] Deletes
exports.delM = async (movieObj) => {
    try {
        return await Movie.deleteOne(movieObj)
    } catch (error) {
        console.log("Error in deleteM function.")
        console.log(error)
    }
}

// Deletes All
exports.delMs = async () => {
    try {
        return await Movie.deleteMany({})
    } catch (error) {
        console.log("Error in deleteM function.")
        console.log(error)
    }
}



// Finds all with specified actor
exports.findMA = async (actorObj) => {
    try {
        return await Movie.find(actorObj)
    } catch (error) {
        console.log("Error in findMA function.")
        console.log(error)
    }
}

// Finds Title
exports.findMT = async (titleObj) => {
    try {
        return await Movie.findOne(titleObj)
    } catch (error) {
        console.log("Error in findM function.")
        console.log(error)
    }
}