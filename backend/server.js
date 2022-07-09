const express=require('express');
const dotenv=require('dotenv')
var colors = require('colors');
const userRoutes=require('./routes/useRoutes');
const { notFound, errorHandler } = require("./middleware/errorhandlere");
const dbConnection=require('./config/mongoose');
dbConnection;
const app=express();
dotenv.config();

app.use(express.json())
app.use('/api/user',userRoutes) // to accept the json data


app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT;

app.listen(PORT,()=>
{
    console.log(`Server is up at ${PORT}`.yellow.bold)
})
