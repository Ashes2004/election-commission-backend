import express from 'express';


const app = new express();

const PORT  = process.env.PORT || 3000;
app.listen(3000 , ()=>{
    console.log(`server is running on port ${PORT}`);
});

