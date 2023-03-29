import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
    },
    arrivalDate: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Order', OrderSchema);

// {
//   userId: { type: String, required: true },
//   products: [
//     { productId: { type: String }, quantity: { type: Number, default: 1 } },
//   ],
//   subtotal: { type: Number, required: true },
//   total: { type: Number, required: true },
//   shipping: { type: Object, required: true },
//   delivery_status: { type: String, default: "pending" },
//   payment_status: { type: String, required: true },
// },
// { timestamps: true }
// );
