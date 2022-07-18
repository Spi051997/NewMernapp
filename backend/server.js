const express=require('express');
const dotenv=require('dotenv')
var colors = require('colors');
const userRoutes=require('./routes/useRoutes');
const chatRoutes=require('./routes/chatRoutes');
const messageRoutes=require('./routes/messageRoutes');
const { notFound, errorHandler } = require("./middleware/errorhandlere");
const dbConnection=require('./config/mongoose');

const { application } = require('express');
dbConnection;
const app=express();
dotenv.config();

app.use(express.json())
app.use('/api/user',userRoutes) // to accept the json data
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT;

 const server=app.listen(PORT,()=>
{
    console.log(`Server is up at ${PORT}`.yellow.bold)
})

const io=require('socket.io')(server,{
     pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    },
});

// create a connection
io.on("connection",(socket)=>{
    console.log(`Connected to socket.io ${socket}`)
})

