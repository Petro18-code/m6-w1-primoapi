import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import mongoose from 'mongoose'
import authorRoutes from './routes/authorRoutes.js'
import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/authRoutes.js'
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import googleStrategy from './config/passport.config.js';
import authentication from './middleware/authentication.js';

const port = process.env.PORT || 5000
const server = express()

passport.use('google', googleStrategy)

await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
.then(() => console.log('Connessione al DB ok'))
.catch((err) => console.log(err))

server.use(express.json())
server.use(cors());
server.use(morgan('dev'))
server.use(helmet());
server.use('/authors', authentication, authorRoutes)
server.use('/blogPosts', authentication, postRoutes)
server.use('/auth', authRoutes)



server.listen(port, () => {
    console.log(`server is running at port: ${port}`);
})