const mongoose = require('mongoose');
const connectionString = process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(res=>{
    console.log('Database connected!');
}).catch(err=>{
    console.log('Database not connected!',err);
})