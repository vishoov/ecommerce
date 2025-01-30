import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    //example:apple
    name:{
        type:String,
        required:true,
        trim:true,
        min:[3, "Product name must be at least 3 characters long"],
        max:[20, "Product name must be at most 20 characters long"],
    
    },
    //fruit, red, healthy, sweet
    description:{
        type:String,
        required:true,
        trim:true,
        min:[10, "Product description must be at least 10 characters long"],
        max:[200, "Product description must be at most 200 characters long"],
    },
    //Rs.50/kg
    price:{
        type:Number,
        required:true,
    },
    //fruit
    category:{
        type:String,
        required:true,
    },
    //10
    stock:{
        type:Number,
        required:true,
    },
    //fruit wala
    seller:{
        type:String,
        required:true,
    },

    //rating: 4.5, desc: good, very nice
    reviews:{
        type:Array,
        default:[],
    },

    //image links : ["cdn.com/apple.jpg","cdn.com/apple2.jpg"]
    images:{
        type:Array,
        default:[],
    }
    //cdn links are attached to the images array
})


const Product = mongoose.model("Product", productSchema);

export default Product;
