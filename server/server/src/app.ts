require('dotenv').config({"path":'.env'})
import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'

const app: Express = express()
const PORT: string = process.env.NODE_PORT!;
const DB: string = process.env.MONGO_DB!; 

app.use(express.json());
app.use(cors())
app.use(routes)
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set('useFindAndModify', false)
mongoose.set("debug",true)
mongoose.connect(`mongodb://localhost/${DB}`, options)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    )
    .catch((error) => {
        throw error
    })