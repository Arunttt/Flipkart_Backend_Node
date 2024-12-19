const AddtoCart = require('../Models/AddtoCart');
const mongoose = require('mongoose');
const createCart = async (req, res) => {
    try {
        const {
            name,
            brand,
            image,
            rupees,
            userId,
            rating,
            warranty,
            inch,
            highLights,
            seller,
            disable,
            price,
            discounted_price,
            discount_percentage,
            delivery,
            offers,
            cart_details,
            final_price,
        } = req.body;

        if (!cart_details || !cart_details.price_details) {
            return res.status(400).json({ message: 'Missing cart_details or price_details' });
        }

        // const { price_details } = cart_details;
        // const discountAmount = (discount_percentage / 100) * price;
        // const finalPrice = price - discounted_price + price_details.platform_fee;

        const product = new AddtoCart({
            name,
            brand,
            image,
            rupees,
            userId,
            rating,
            warranty,
            inch,
            highLights,
            seller,
            disable,
            price,
            discounted_price,
            discount_percentage,
            delivery,
            offers,
            cart_details,
            final_price,
            // final_price: finalPrice,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Error creating product', error: error.message });  
    }
};

const getDisabledProductsByUserId = async (req, res) => {
    try {

        const { userId } = req.body;

        console.log('Received userId:', userId);

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const disabledProducts = await AddtoCart.find({
            userId: userId,
            disable: true
        });

        console.log('Disabled Products:', disabledProducts);

        if (disabledProducts.length === 0) {
            return res.status(404).json({ message: 'No disabled products found for the given userId' });
        }

        res.status(200).json({
            message: 'Disabled products fetched successfully',
            data: disabledProducts
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch disabled products', error: error.message });
    }
};

// const deleteProduct = async (req.res) => {
//     try{
//         const {_id} = req.params;
        
//         const deleteProduct = await AddtoCart.findOneAndDelete(
//             { _id: id },
//         );

//         if(!deleteProduct){
//             return res.status(404).json({ message : 'Product Not Found...'});
//         }
//         res.status(200).json
//     }
// }


const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await AddtoCart.findById(id);

        console.log("<==Product=Result===>", result);
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving watch details" });
    }
}


module.exports = { createCart,getDisabledProductsByUserId, getProductById };
