import 'dotenv/config';
import express, { json } from 'express';
const app=express();
import cors from 'cors';
import mongoose from 'mongoose';
import dns from 'node:dns';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js'
const PORT = 5000;

app.use(json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

if(process.platform==='win32' && dns.getServers().includes('127.0.0.1')){
    dns.setServers(['1.1.1.1','8.8.8.8']);
}

 app.use('/api/auth',router)
 app.use(errorHandler);
const dbURI= process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then((result)=>app.listen(PORT,()=>{
        console.log('success',PORT)
    }))
    .catch((err)=>console.log(err));
    

   


