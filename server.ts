import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/database';
import route from './routes/routes';
import client from './database/client';


dotenv.config()
const app = express();

const connection = async()=>{
    try {
        await db.authenticate()
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
}
connection()


app.use(bodyParser.json());
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());


app.use('/api/account', route)

app.listen(5000, ()=>{
    console.log('Server is running')
})
