const express = require('express')
const dotenv = require('dotenv').config()
const router = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;
connectDb()
//app.use('/api/contacts', require('./routes/contactRoutes'))
app.use(cors())
app.use(express.json())
app.use(errorHandler)

app.use('/api/contacts', router)
app.use('/api/users', require("./routes/userRoutes"))


// app.get('/api/contacts',(req,res)=>{
//     res.send("Hello World")
// })


app.listen(port ,()=>{
    console.log("Server is listening to " + port)
})