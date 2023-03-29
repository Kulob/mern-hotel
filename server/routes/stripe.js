import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config();

const stripe = Stripe(process.env.REACT_APP_STRIPE_KEY);
const router = express.Router();

router.post('/payment', async (req, res) => {
  // const { data, data2, data3, } = req.body;
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price_data: {
  //         currency: 'rub',
  //         product_data: {
  //           name: data,
  //           description: data2,
  //         },
  //         unit_amount: data3 * 100,
  //       },
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'payment',
  //   success_url: `${process.env.REACT_APP_CLIENT_URL}/checkout-success`,
  //   cancel_url: `${process.env.REACT_APP_CLIENT_URL}/`,
  // });
  // res.send({ url: session.url });
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'rub',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    },
  );
});

export default router;
