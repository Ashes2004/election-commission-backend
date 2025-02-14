import express from 'express';
import { connectDB } from './connectDB.js';
import { configDotenv } from 'dotenv';
const app = new express();
configDotenv();
const PORT  = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);
});


app.get('/' , (req,res)=>{
    res.send('hello world');
})

connectDB();