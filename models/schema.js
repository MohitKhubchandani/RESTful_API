import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, "Price must not be empty"]
    },
    featured: {
        type: Boolean,
        default: false
    }, 
    rating: {
        type: Number,
        default: 4.9
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum:{
            values: ["nvidia", "tesla", "apple", "hp"],
            message: `{values} is not supported`
        }
    }
});

const Product = mongoose.model("Product", productsSchema);

export default Product;