const Stripe = require("stripe");

const paymentIntent = async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 39 * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(201).send({
            status: 200,
            sucess: true,
            clientSecret: paymentIntent.client_secret
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    paymentIntent
}