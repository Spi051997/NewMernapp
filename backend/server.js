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


// for Testing

// app.use('/api/chat',(req,res)=>{
//       res.send([
//         {
//             id:1,
//             Name:"Shubham"
//         },
//         {
//             id:2,
//             Name:"Purvi"
//         }
//       ])
// })

app.use(express.json())
app.use('/api/user',userRoutes) // to accept the json data
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT;

app.listen(PORT,()=>
{
    console.log(`Server is up at ${PORT}`.yellow.bold)
})
