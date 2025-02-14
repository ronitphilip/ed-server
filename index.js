require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./dbConnection/db')

const edServer = express()
edServer.use(cors())
edServer.use(express.json())
edServer.use(router)
edServer.use('/uploads', express.static('./uploads'));

const PORT = 8080

edServer.listen(PORT, () => {
    console.log('Server running');
});

edServer.get('/',(req,res)=>{
    res.status(200).send('Edway Server')
})