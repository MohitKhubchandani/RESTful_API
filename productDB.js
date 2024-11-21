import dotenv from 'dotenv';

dotenv.config();

import connectDB from "./DB/connect.js";
import Product from "./models/product.js";
import ProductJson from "./products.json" assert { type: 'json' };


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL); 
        await Product.create(ProductJson);
        console.log("sucess");

    } catch (error) {
        console.log(error);
    }
};
 
start()

