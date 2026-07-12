import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, tableNumber } = req.body;
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: req.user?._id || null,
      tableNumber,
      items,
      totalAmount,
    });

    const io = req.app.get("io");
    io.emit("newOrder", order); // notify kitchen dashboard in real time

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    const io = req.app.get("io");
    io.emit("orderStatusUpdate", order); // customer sees live status change

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
