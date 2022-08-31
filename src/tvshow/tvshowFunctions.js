const TVShow = require("./tvshowModel")

// [C] Create
exports.createT = async (tvShowObj) => {
    try {
        await TVShow.create(tvShowObj)
    } catch (error) {
        console.log("Error in createT function.")
        console.log(error)
    }
}

// [R] Read (List)
exports.listT = async () => {
    try {
        return await TVShow.find({})
    } catch (error) {
        console.log("Error in listT function.")
        console.log(error)
    }
}

// [U] Updates Specified
exports.updateTV = async (tvShowObj, updatetvShowObj) => {
    try {
        return await TVShow.updateOne(tvShowObj, updatetvShowObj)
    } catch (error) {
        console.log("Error in updateTV function.")
        console.log(error)
    }
}

// [D] Delete
exports.delTV = async (tvShowObj) => {
    try {
        return await TVShow.deleteOne(tvShowObj)
    } catch (error) {
        console.log("Error in delTV function.")
        console.log(error)
    }
}

// Deletes All
exports.delTVAll = async () => {
    try {
        return await TVShow.deleteMany({})
    } catch (error) {
        console.log("Error in delTVAll function.")
        console.log(error)
    }
}

// Finds all with specified actor.
exports.findTA = async (actorObj) => {
    try {
        return await TVShow.find(actorObj)
    } catch (error) {
        console.log("Error in findTA function.")
        console.log(error)
    }
}

// Finds TV Show Title
exports.findtvTitle = async (titleObj) => {
    try {
        return await TVShow.findOne(titleObj)
    } catch (error) {
        console.log("Error in findtvTitle function.")
        console.log(error)
    }
}


