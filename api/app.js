require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

// internal import 
const paymentRoute = require('./routers/stripeRoute')

const app = express()

app.use(morgan('dev'));
app.use(cors());

// routes
app.use("/api/checkout", paymentRoute)


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

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`Server is running successfull`);
});
