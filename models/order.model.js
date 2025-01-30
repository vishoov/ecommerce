import mongoose from "mongoose";


//orderItem Schema 

const orderItemSchema = ({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        // required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    //taxes 
    taxes:{
        type:Number,
        // required:true,
    },
    shippingCharges:{
        type:Number,
        // required:true,
    },
    discounts:{
        type:Number,
        // required:true,
    }
    //shipping charges
    //discounts

});



//order Schema

const orderSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        //this connects the order to a user ID in the User model to connect the order to that user
        ref:"User",
        required:true,

    },
    orderItems : [orderItemSchema],
    shippingAddress:{
        address: String,
        city:String,
        postalCode:Number,
        country:String,

    },
    paymentMethod:{
        type:String,
        required:true,
    },
    totalPrice:{
        type:Number,
        // required:true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        // required:true,
        default:false,
    },
    status:{
        type:String,
        required:true,
        enum:["Processing", "Shipped", "Out for delivery", "Delivered"],
        default:"Processing",

    },
    trackingNumber:String


},{timestanps:true});


const Order = mongoose.model("Order", orderSchema);

export default Order;