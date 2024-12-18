const Product = require('../Models/PurchaseModels');

async function createData(req, res) {
    try {

        const { productName, Rupees, Rom, Inch, Camera, Processor, Waranty, Battery, identify } = req.body;

        const newProduct = new Product({
            productName,
            Rupees,
            Rom,
            Inch,
            Camera,
            Processor,
            Waranty,
            Battery,
            identify
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product created successfully!', product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
}

async function getProductsByIdentify(req, res) {
    try {

        const { identify } = req.body;
        console.log('Received identify parameter:', identify);

        const products = await Product.find({ identify: identify });
        console.log('Products found:', products);

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this identify' });
        }

        res.status(200).json({ products });
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
}

async function getProductsByFind(req, res) {
    try {
        const { name } = req.params;
        console.log('Received identify parameter:', name);
        
        const product = await Product.find({ productName: name });
        console.log('Product found:', product);

        if (product.length === 0) {
            return res.status(404).json({ message: 'No product found with this name' });
        }
        
        res.status(200).json({ product });
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
}


async function getAll(req, res) {
    try {
    const products = await Product.find();
    console.log('All___Products', products);

    if (products.length === 0) {
        return res.status(404).json({ message: 'No products found for this identify' });
    }

    res.status(200).json({ products });
} catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
}
}


module.exports = { createData, getProductsByIdentify, getAll, getProductsByFind };
