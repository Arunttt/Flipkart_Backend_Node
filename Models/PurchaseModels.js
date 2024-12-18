const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    productName:{
        type:String,
    },
    Rupees:{
        type:String,
    },
    Rom:{
        type:String,
    },
    Inch:{
        type:String,
    },
    Camera:{
        type:String,
    },
    Processor:{
        type:String
    },
    Waranty:{
        type:String
    },
    Battery:{
        type:String
    },
    identify:{
        type: String
    }
},{
    timestamps: true
});

const PurchaseModel = mongoose.model("PurchaseModel",purchaseSchema);

module.exports = PurchaseModel;