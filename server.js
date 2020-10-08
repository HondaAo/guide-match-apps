const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./route/userRoute')
const guideRoute = require('./route/guideRoute')
const chatRoute = require('./route/chatRoute')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true,useUnifiedTopology: true },()=> console.log('Connected'))


app.use(cors())
app.use(express.json())

app.use('/api/user', userRoute);
app.use('/api/guide', guideRoute);
app.use('/api/chat', chatRoute)

app.listen(5000,()=> console.log('Server is running 0n 5000'))