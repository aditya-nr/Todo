// installed module
const express = require('express');
const path = require('path');
// require('dotenv').config();

//custom module
require('./db/config.js');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandler.js');


const app = express();
app.use(express.static(path.join(__dirname, "./public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`server is listing on port ${process.env.PORT}`);
})