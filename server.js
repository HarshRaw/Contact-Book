const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config(); // npm i dotenv to set it up and than carry the value from .env

connectDb();

const app = express();
//const port =5000;

const port = process.env.PORT || 5000;

// using thunder client for api testing 
//app.get('/api/contacts', (req, res) =>{
//    res.status(200).json({message:"Get All contacts"});
//});

// to make use of any middleware use app.use
app.use(express.json()); // this is going to provide a parser.. help to parse the data stream from the client in the server side
 
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});