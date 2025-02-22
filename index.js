import express from 'express';
import { connectDB } from './connectDB.js';
import { configDotenv } from 'dotenv';
import voterRoutes from "./routes/voterRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import cors from 'cors';
const app = new express();
configDotenv();
const PORT  = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);
});
app.use(express.json());
app.use(cors());


app.use('/api/voter' , voterRoutes);
app.use('/api/election' , electionRoutes);
app.use('/api/admin' , adminRoutes);
app.use('/api/candidate' , candidateRoutes);
app.use('/api/news' , newsRoutes);



connectDB();