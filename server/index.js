const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const enquiryRouter = require('./MVC-R/routes/enquiryRoutes');

require('dotenv').config();
let app=express();
app.use(cors())
app.use(express.json());

app.use('/api/website/enquiry',enquiryRouter);

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connected to mongodb");
    app.listen(process.env.PORT || 3000, ()=>{
        console.log("server is running");
    });
}).catch((err)=>{console.log(err)})
