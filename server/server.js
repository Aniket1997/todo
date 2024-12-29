const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
 
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api',require('./router/userRouter'));
app.use('/api',require('./router/boardRoute'));
connectDb();

app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`);
})