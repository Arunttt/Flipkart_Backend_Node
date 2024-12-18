const Order = require('../Models/Order');

const createOrder = async (req, res) => {
    try {
        const { name, mobileNumber, deliveryAddress, state, total_amount } = req.body;

        // const existingOrder = await Order.findOne({ mobileNumber });
        // if (existingOrder) {
        //     return res.status(400).json({ message: 'Mobile number already exists' });
        // }

        const newOrder = new Order({
            name,
            mobileNumber,
            deliveryAddress,
            state,
            total_amount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ message: 'Order created successfully!', order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};


module.exports = {createOrder};