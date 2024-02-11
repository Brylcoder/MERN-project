import express from  'express';
import { postRoutes } from './routes/postRoutes.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json())

app.use('/api/post', postRoutes)

mongoose.connect('mongodb://localhost:27017/MERN-APP')
    .then(()=> {
        console.log("Connected  to MongoDB");
        app.listen(4000, 'localhost', () => {console.log("listening to  port 4000");});
    })
    .catch((err) => console.log(err))

