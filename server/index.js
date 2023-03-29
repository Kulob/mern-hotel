import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import usersRoute from './routes/users.js';
import roomsRoute from './routes/rooms.js';
import stripeRoute from './routes/stripe.js';
import orderRoute from './routes/order.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

mongoose.set('strictQuery', false);
const app = express();
dotenv.config();
const port = process.env.PORT;

const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDb OK');
  } catch (error) {
    console.log(error, 'MONGODB ERROR');
  }
};
connectMongoose();

app.use(cors());
// app.use(cors({ origin: 'http://127.0.0.1:8081', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Middlewares
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/stripe', stripeRoute);
app.use('/api/orders', orderRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  console.log(`server OK: port-${port}`);
});
