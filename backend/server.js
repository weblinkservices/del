const app = require('./app');
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary');

const dotenv = require('dotenv');

//Handle Uncaught exception
process.on('uncaughtException', err=>{
    console.log(`ERROR: ${err.message}`);
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})
//console.log(a);

//Setting up config file
dotenv.config({path:'backend/config/config.env'}) 
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({path:'backend/config/config.env'}) 

//Connecting to database
connectDatabase();

//Setting up cloudinary configuration 
cloudinary.config({
  cloud_name : process.env.CLOUDNARY_CLOUD_NAME,
  api_key : process.env.CLOUDNARY_API_KEY,
  api_secret : process.env.CLOUDNARY_API_SECRET,
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

//Handle Unhandled Promise rejection
process.on('unhandledRejection', err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down th server due to Unhandled Promise rejection');
    server.close(()=>{
        process.exit(1)
    })
});