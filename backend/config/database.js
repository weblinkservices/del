const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        //useCreateIndex:true  //mongoose v 6 above no longer to support
    }).then(con=>{
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })

};
module.exports=connectDatabase;
