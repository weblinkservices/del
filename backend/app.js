const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')

const errorMiddeware = require('./middlewares/error')


//Setting up config file
dotenv.config({path:'backend/config/config.env'}) 
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path:'backend/config/config.env'}) 

// app.use(express.json());
// app.use(bodyparser.urlencoded({extended:true}));
// app.use(cookieParser());
// app.use(fileUpload())

// uploading an image of more than 1mb. most product images are more than 1mb
app.use(express.json({limit: '50mb'}));
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(fileUpload())
//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)

if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

//Middleware to handle errors
app.use(errorMiddeware);

module.exports = app