require('dotenv').config({path: './Config/.env'});
const express = require('express')
const app = express();
const path =require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const ConnectDb = require('./Config/DbConn')
const cors = require( 'cors' );
const corsOptions = require('./Config/corsOptions')
const{ v2: cloudinary }  = require('cloudinary');
const mongoose = require('mongoose')

ConnectDb()
const Port = process.env.Port || 3500
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json()) // Allows us to handle json

app.get(express.static(path.join(__dirname, 'public')));
app.use('/', require("./Routes/raiz"))

app.use('/api/user', require("./Routes/userRoute"))

app.use('/api/auth', require("./Routes/authRoute"))

app.use('/api/post', require("./Routes/postRoute"))

app.all("*",(req, res) =>{
res.status(404)
if(req.accepts('html')) {
    res.sendFile(path.join( __dirname + "Views/404.html"));
}
else if(req.accepts("json")) {
    res.json({Message : "404 Not found" })
}
else {
    res.type("txt").send("Not Found");
}
})

mongoose.connection.once( 'open', ()=>{
   console.log('Connecting to Mongodb')
    app.listen(Port , ()=>{ console.log(`Server is running on port ${Port}`)})

})
mongoose.connection.on('error', (err)=>{
    console.log(err)
}
)