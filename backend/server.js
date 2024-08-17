import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import mongoose from 'mongoose'
import authorRoutes from './routes/authorRoutes.js'

const port = process.env.PORT || 5000
const server = express()

server.use(express.json())
server.use(cors());
server.use('/authors', authorRoutes)

await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
.then(() => console.log('Connessione al DB ok'))
.catch((err) => console.log(err))

server.listen(port, () => {
    console.log(`server is running at port: ${port}`);
})