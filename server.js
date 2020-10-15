const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./route/userRoute')
const guideRoute = require('./route/guideRoute')
const chatRoute = require('./route/chatRoute')
const guideListRoute = require('./route/guideList')
const requestRoute = require('./route/requestRoute')
const reviewRoute = require('./route/reviewRoute')
const dotenv = require('dotenv')
const imageRoute = require('./route/imageRoute')
const locationRoute = require('./route/locationRoute')

dotenv.config()

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true,useUnifiedTopology: true },()=> console.log('Connected'))


app.use(cors())
app.use(express.json())
const path = require("path");
app.use(express.static(path.join(__dirname, "./public/")));
app.use("/public", express.static(__dirname + "/public"))

app.use('/api/user', userRoute);
app.use('/api/guide', guideRoute);
app.use('/api/guideList',guideListRoute)
app.use('/api/chat', chatRoute)
app.use('/api/request',requestRoute)
app.use('/api/review',reviewRoute)
app.use('/api/image',imageRoute)
app.use('/api/location' , locationRoute)

app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});


const port = process.env.PORT || 5000

app.listen(port,()=> console.log(`Server is running on ${port}`))