const router = require("express").Router();

const {
    paymentIntent,
} = require('../controllers/stripeController');


router.post('/payment', paymentIntent);


module.exports = router;