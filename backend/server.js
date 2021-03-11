const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
app.use(cors())
app.use(express.json());



//Routes
app.use('/', require('./routes/index'));
//app.use('/api/url', require('./routes/url'));


//var port=process.env.PORT || 5000
var port = 4000
app.listen(port,()=>{
        console.log(`Server is running on port: ${port}`)
});