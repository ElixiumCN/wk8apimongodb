require("./db/connection");
const mongoose = require('mongoose')
const yargs = require("yargs")

const { createM, listM, delM, delMs, updateM, findMA, findMT } = require("./movie/movieFunctions")
const { createT, listT, delTV, updateTV, findTA, delTVAll, findtvTitle } = require("./tvshow/tvshowFunctions")
let log = console.log

// tested working       [x]
// tested not working   [-]
//1 [x] node app.js --add --movies --title "Matrix2" --actor "John Smith"
//2 [x] node app.js --list --movies
//3 [x] node app.js --delete --movies --title "Matrix2" --actor "John Smith"
//4 [x] node app.js --deleteAll --movies
//5 [x] node app.js --update --movies --newTitle "Matrix3" --newActor "John Doe" --title "Matrix2" --actor "John Smith"
//6 [x] node app.js --find --movies --actor "John Doe"
//7 [x] node app.js --find --movies --title "Matrix3"
//tv shows
//1 [x] node app.js --list --tvshows
//2 [x] node app.js --add --tvshows --title "The Simpsons" --actor "Geoff Smith"
//3 [x] node app.js --delete --tvshows --title "The Simpsons" --actor "Geoff Smith"
//4 [x] node app.js --deleteAll --tvshows
//5 [x] node app.js --update --tvshows --newTitle "The Somethings" --newActor "Jane Doe" --title "The Simpsons" --actor "Geoff Smith"
//x [x] node app.js --find --tvshows --actor "Jane Doe"
//6 [x] node app.js --find --tvshows --title "The Somethings"

//1 Create new doc & requires movie title & actor.
// Requires --add --movies --title <movieName> --actor <actorName>
//2 Lists all movies --list --movies
//3 Deletes specified movie: requires movie title & actor.
// Requires --delete --movies --title <movieName> --actor <actorName>
//4 Deletes all movies: --deleteAll --movies
//5
// Updates specified movie requires movie title & actor.
// requires --update --newTitle <movieName> --newActor <actorName> --title <movieName> --actor <actorName>
// current movie is title: Spiderman actor: "Andrew Garfield"
// To update do the following:
// node app.js --update --movies --newTitle Batman --newActor Christian --title Spiderman --actor "Andrew Garfield"
//6
// Lists all movies containing actor
// --find --movies --actor <actorName>
//7
// Find specified movie: 
// --find --movies --title <movieName>
//TV Shows
//1 List all tvshows: --list --tvshows
//2 Delete specified tv shows: requires tvshows title & actor
//2 requires --delete --tvshows --title <movieName> --actor <actorName>
//3 Delete all tvshows: --deleteAll --tvshows
//4
// Updates specified movie: requires movie title & actor
// requires --update --newTitle <movieName> --newActor <actorName> --title <movieName> --actor <actorName>
// How to update:
// node app.js --update --tvshows --newTitle TheMovie --newActor Someguy --title Themovie2 --actor "Someguy2"
//5
// Lists all tvshows with specified actor:
// --find --tvshows --actor <actorName>
//6
// List altvshows with specified title: 
// --find --tvshows --title <showName>

const app = async (yargsObj) => {
    try {
        //1
        if(yargsObj.add && yargsObj.movies) {
            await createM({
                title: yargsObj.title, 
                actor: yargsObj.actor})
                log(await listM())
        }
        //2
        else if (yargsObj.list && yargsObj.movies) {
            let list = await listM()
            log("List All Movies:")
            log(list)
        } 
        //3
        else if (yargsObj.delete && yargsObj.movies) {
            await delM({
                title: yargsObj.title, 
                actor: yargsObj.actor
            })
            log("Deleted the Specified Movie!")
            log("Remaining Movies:")
            log(await listM())
        }
        //4
        else if (yargsObj.deleteAll && yargsObj.movies) {
            await delMs()
            log("Deleted All Movies!")
        }
        //5
        else if (yargsObj.update && yargsObj.movies) {
            await updateM(
                {
                title: yargsObj.title, 
                actor: yargsObj.actor},
                {
                title: yargsObj.newTitle,
                actor: yargsObj.newActor,
                })
            log("Updated Specified Movie")
            log(await listM())
        }
        //6
        else if ((yargsObj.findActor && yargsObj.movies) || (yargsObj.find && yargsObj.actor && yargsObj.movies)) {
            let findActor = await findMA({actor: yargsObj.actor})
            log(await findActor)
        }
        //7
        else if ((yargsObj.findMovie && yargsObj.movies) || (yargsObj.find && yargsObj.title && yargsObj.movies)) {
            let findMovie = await findMT({title: yargsObj.title})
            log(await findMovie)
        }

        // TV Shows

        else if(yargsObj.add && yargsObj.tvshows) {
            await createT({
                title: yargsObj.title, 
                actor: yargsObj.actor})
                log(await listT())
        }
        //1
        else if (yargsObj.list && yargsObj.tvshows) {
            let listTV = await listT()
            log("Listing All TV Shows:")
            log(listTV)
        } 
        //2
        else if (yargsObj.delete && yargsObj.tvshows) {
            await delTV({
                title: yargsObj.title, 
                actor: yargsObj.actor
            })
            log("Deleted Specified TV Show!")
            log("Remaining TV Shows:")
            log(await listT())
        }
        //3
        else if (yargsObj.deleteAll && yargsObj.tvshows) {
            await delTVAll()
            log("Deleted All TV Shows!")
        }
        //4
        else if (yargsObj.update && yargsObj.tvshows) {
            await updateTV(
                {
                title: yargsObj.title, 
                actor: yargsObj.actor},
                {
                title: yargsObj.newTitle,
                actor: yargsObj.newActor,
                })
            log("Updated Specified TV Show")
            log(await listT())
        }
        //5
        else if ((yargsObj.findActor && yargsObj.tvshows) || (yargsObj.find && yargsObj.actor && yargsObj.tvshows)) {
            let findTVActor = await findTA({actor: yargsObj.actor})
            log(await findTVActor)
        }
        //6 
        else if ((yargsObj.findTVShow && yargsObj.tvshows) || (yargsObj.find && yargsObj.title && yargsObj.tvshows)) {
            let findTVShow = await findtvTitle({title: yargsObj.title})
            log(await findTVShow)
        }
        else {
            log("Incorrect cmd, try again!")
        }
        await mongoose.disconnect();
    } catch (error) {
        log(error)
        await mongoose.disconnect();
    }

}

app(yargs.argv)