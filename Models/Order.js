const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    productName:{
        type: String,
    },
    mobileNumber: {
        type: Number,
        required: [true, 'Enter a Mobile Number'],
        
    },
    deliveryAddress: {
        type: String,
        required: [true, 'Enter a Delivery Address']
    },
    state: {
        type: String,
        required: [true, 'Enter a state']
    },
    total_amount: {
        type: Number,
        required: [true, 'Enter a total_amount']
    }
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
