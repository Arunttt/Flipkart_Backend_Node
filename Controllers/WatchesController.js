const Watch = require('../Models/Watches');
const mongoose = require('mongoose');
const sharp = require('sharp');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//-----Image Resize with Original Image------
const imageProcess = async (req, res) => {
    try {
  
        const originalImagePath = path.join('D:', 'images', 'my-images.jpg');

        const imagesDir = path.join(__dirname, 'public', 'images');

        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        const outputPath = path.join(imagesDir, 'resized-my.png');
        

        if (!fs.existsSync(originalImagePath)) {
            return res.status(404).send('image not identify');
        }

        await sharp(originalImagePath)
            .resize(1700, 300)
            .toFile(outputPath);

        console.log('Image Resize Successfully');
        res.sendFile(outputPath);
    } catch (error) {
        console.error('Image error:', error);
        res.status(500).send('error: ' + error.message);
    }
};



// Create a new watch
const createWatch = async (req, res) => {
    try {
        const {
            name,
            brand,
            image,
            rupees,
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
            cart_details, } = req.body;

        const discountAmount = (discount_percentage / 100) * price;
        const finalPrice = price - discounted_price + cart_details.price_details.platform_fee;

        const product = new Watch({
            name,
            brand,
            image,
            rupees,
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
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

//----------New Update----------------

// Update Product Controller
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            price,
            cart_details, // This includes the quantity, total_amount, price_details, and savings
        } = req.body;

        // Calculate any additional fields you need like final price
        const { price_details } = cart_details;
        const finalPrice = price - price_details.discount + price_details.platform_fee;

        // Update the product in the database
        const updatedProduct = await Watch.findByIdAndUpdate(
            id,
            {
                price,  // Update the price
                cart_details,  // Update the cart details (quantity, total_amount, price_details, savings)
                final_price: finalPrice,  // Calculate the final price
            },
            { new: true }  // Return the updated document
        );

        // If the product is not found, return an error
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return the updated product
        res.status(200).json(updatedProduct);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Error updating product', error });
    }
};



// const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             price,
//             discounted_price,
//             discount_percentage,
//             delivery,
//             offers,
//             cart_details,
//         } = req.body;

//         const discountAmount = (discount_percentage / 100) * price;
//         const finalPrice = price - discounted_price + cart_details.price_details.platform_fee;

//         const updatedProduct = await Watch.findByIdAndUpdate(
//             id,
//             {
//                 price,
//                 discounted_price,
//                 discount_percentage,
//                 delivery,
//                 offers,
//                 cart_details,
//                 discountAmount,    
//                 finalPrice,        
//             },
//             { new: true }
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating product', error });
//     }
// };




// Get all watches
const getAllWatches = async (req, res) => {
    try {
        const watches = await Watch.find();
        res.status(200).json(watches);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch watches', error });
    }
};


const getWatchById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Watch.findById(id);

        console.log("<===Result===>", result);
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving watch details" });
    }
}



// Update a watch
const updateWatch = async (req, res) => {
    try {
        const { brand } = req.params;
        const updateData = req.body;


        const updatedWatch = await Watch.findOneAndUpdate(
            { brand: brand },
            updateData,
            { new: true }
        );

        if (!updatedWatch) {
            return res.status(404).json({ message: 'Watch not found' });
        }

        res.status(200).json({ message: 'Watch updated successfully!', updatedWatch });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update watch', error });
    }
};


// Delete a watch
const deleteWatch = async (req, res) => {
    try {
        const { brand } = req.params;

        const deletedWatch = await Watch.findOneAndDelete(
            { brand: brand },
        );

        if (!deletedWatch) {
            return res.status(404).json({ message: 'Watch not found' });
        }

        res.status(200).json({ message: 'Watch updated successfully!', deletedWatch });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update watch', error });
    }
};

//---------------GetAll-------------------

const getAllData = async (req, res) => {
    try {
        const allData = await Watch.find()

        console.log("<===AllData===>", allData)
        res.status(200).json({ allData })
    } catch (error) {
        console.log(error)
    }
}

//---------------Disable Data-------------------

const Findbydisabel = async (req, res) => {
    try {
        const allCartDetails = await Watch.find(
            { disable: true },
        )
        console.log("<== AllCartDetails ==>", allCartDetails);
        res.status(200).json({ message: 'All Cart Details', allCartDetails });
    } catch (error) {
        res.status(500).json({ message: 'error', error });
    }
};
//---------------Search------------------

const fieldSearch = async (req, res) => {
    try {
        const { query } = req.body;

        const productsSearch = await Watch.find({
            name: { $regex: query, $options: 'i' },
        });

        if (productsSearch.length > 0) {
            return res.json(productsSearch);
        } else {
            return res.status(404).json({ message: "No productsSearch found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching productsSearch" });
    }
};

const disabledFunction = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedWatch = await Watch.findByIdAndUpdate(
            id,
            { disable: true },
            { new: true }
        );
        
        if (!updatedWatch) {
            return res.status(404).json({ message: 'Watch not found' });
        }

        res.status(200).json({ message: 'Watch disabled successfully!', updatedWatch });
    } catch (error) {
        res.status(500).json({ message: 'Failed to disable watch', error });
    }
};


module.exports = {
    createWatch,
    getAllWatches,
    getAllData,
    disabledFunction,
    Findbydisabel,
    updateProduct,
    // getWatchByBrand,
    getWatchById,
    fieldSearch,
    updateWatch,
    deleteWatch,
    imageProcess,
};


// ---------------------Update With Id------------------

// const updatedProduct = async (req,res) => {

//     try{
//         const { id } = req.params;
//         const UpdateData = req.body;

//         await Watch.findById
//     }catch(error){
    
//     }
// };

// ----------------------*************_____________________


// Get a single watch by ID
// const getWatchByBrand = async (req, res) => {
//     try {
//         const brand = req.params.Brand;
//         const watch = await Watch.findOne({ Brand: brand });

//         if (!watch) {
//             return res.status(404).json({ message: 'Watch not found for the given brand' });
//         }

//         res.status(200).json(watch);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch watch by brand', error });
//     }
// };

// ----------------------************--------------------------------

//Get a Single Watch Name

// async function getWatchById(req, res) {
//     try {
//         const { _id } = req.params;
//         console.log(_id)
//         // Check if _id is valid
//         // if (!mongoose.Types.ObjectId.isValid(_id)) {
//         //     return res.status(400).json({ message: 'Invalid product ID' });
//         // }

//         const product = await Watch.findById(_id);
//         if (!product) {
//             return res.status(404).json({ message: 'No product found with this ID' });
//         }

//         res.status(200).json({ product });
//     } catch (error) {
//         console.error('Error retrieving product:', error);
//         res.status(500).json({ message: 'Error retrieving product', error: error.message });
//     }
// }


// -----------------------*************-----------------------------


// const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { quantityIncrease } = req.body;

//         console.log(req.body);
//         const product = await Watch.findById(id);

//         if (!product) {
//             res.status(404).json({ message: 'Product Not Found' });
//         }

//         const increaseBy = quantityIncrease || 1;

//         console.log("req.body", increaseBy);
//         console.log(quantityIncrease);
//         product.cart_details.quantity += increaseBy;

//         product.price += product.price * increaseBy;

//         product.discounted_price += product.discounted_price * increaseBy;

//         product.cart_details.price_details.discount += product.cart_details.price_details.discount * increaseBy;

//         product.cart_details.total_amount = product.discounted_price + product.cart_details.price_details.platform_fee;

//         product.cart_details.savings = product.cart_details.price_details.discount;

//         const updatedProduct = await product.save();

//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating product', error });
//     }
// };

