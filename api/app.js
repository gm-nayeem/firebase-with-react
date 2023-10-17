require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('./config/dbConn');

const userRoute = require('./routers/userRoute');
const folderRoute = require('./routers/folderRoute');

const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'all ok'
    });
});

// routes
app.use("/api/users", userRoute);
app.use("/api/folders", folderRoute);

// server error handle
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    });
});

module.exports = app;
