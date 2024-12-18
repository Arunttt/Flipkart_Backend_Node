const mongoose = require('mongoose');

const addSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rupees: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required:true,
  },
  rating: {
    type: String,
  },
  warranty: {
    type: String,
  },
  inch: {
    type: String,
  },
  highLights: [String],
  seller: {
    type: String,
  },
  disable: {
    type: Boolean,
  },

  price: {
    type: Number,
    required: true,
  },
  discounted_price: {
    type: Number,
    required: true,
  },
  discount_percentage: {
    type: Number,
  },
  delivery: {
    date: {
      type: String,
    },
    charges: {
      type: Number,
    },
    free_delivery: {
      type: Boolean,
    }
  },
  offers: {
    type: Number,
  },

  cart_details: {
    quantity: {
      type: Number,
      default: 1,
    },
    total_amount: {
      type: Number,
    },
    price_details: {
      original_price: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      platform_fee: {
        type: Number,
      },
      delivery_charges: {
        type: Number,
      }
    },
    savings: {
      type: Number,
    }
  },

  final_price: {
    type: Number,
  }

}, { timestamps: true });

const AddtoCart = mongoose.model('AddtoCart', addSchema);

module.exports = AddtoCart;
