import Order from '../models/Order.js';
import express from 'express';
import User from '../models/User.js';
// const {  } = require('./verifyToken');

const router = express.Router();

//CREATE

router.post('/:userid', async (req, res) => {
  const userId = req.params.userid;
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { orders: savedOrder._id },
      });
    } catch (err) {
      console.log(err);
    }
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
// router.delete('/:id', async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json('Order has been deleted...');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.delete('/:id/:userid', async (req, res) => {
  const userId = req.params.userid;
  try {
    await Order.findByIdAndDelete(req.params.id);
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { orders: req.params.id },
      });
    } catch (err) {
      console.log(err);
    }
    res.status(200).json('Order has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
// router.get('/find/:userId', async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get('/income', async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
