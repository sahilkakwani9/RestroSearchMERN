import app from './Server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import restaurantsDAO from "./dao/restaurantsDAO.js"
import reviewsDAO from "./dao/reviewsDAO.js"

dotenv.config() //loads the enviorment variables

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.MERN_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true }
    )
    .catch(err=>{
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client=>{
        await restaurantsDAO.injectDB(client)
        await reviewsDAO.injectDB(client)
        app.listen(port, ()=>{
            console.log(`listening on port:${port}`)
        })
    })