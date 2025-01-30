import express from "express";
const router = express.Router();
import Product from "../models/product.model.js";
//Order Routes
import Order from "../models/order.model.js";
//Place Order

router.post("/place", async (req, res) => {
    try {
        const { user, orderItems, shippingAddress, paymentMethod } = req.body;
        //extracted the order information

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items provided" });
        }



        // Fetch product details and calculate total price
        const populatedOrderItems = await Promise.all(orderItems.map(async (item) => {
                    //fetching the product details using a promise 
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }
            return {
                product: product._id,
                quantity: item.quantity,
                price: product.price
            };
        }));

        const totalPrice = populatedOrderItems.reduce((total, item) => 
            total + (item.price * item.quantity), 0);

        const order = await Order.create({
            user,
            orderItems: populatedOrderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paid: Date.now(),
            trackingNumber: generateTrackingNumber(),
        });

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error placing order", error: err.message });
    }
});


//get order by ID
router.get("/:id", async (req, res)=>{
    try{
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);

    }
    catch(err){
        res.status(500).json(err);
    }

});

//Track Order
router.get("/track/:id", async (req, res)=>{
    try{
       const order = await Order.findOne({
        trackingNumber: req.params.trackingNumber,

       }).select('status shippingAddress');

       res.status(200).json({
        status:order.status,
        shippingAddress: order.shippingAddress,
        estimatedDelivery: new Date(Date.now()+5*24*60*60*1000)
        //standard delivery date

       })



    }
    catch(err){
        res.status(500).json(err);
    }

});

//Updating order status
router.put("/:id", async (req, res)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(order.status === "Delivered"){
            return res.status(400).json({message: "Order has already been delivered"});
        }

        order.status = req.body.status;
        await order.save();


        res.status(201).json(order);
    }
     catch(err){
        res.status(500).json(err);  
     }
})


const generateTrackingNumber = () =>{
    return 'TRK'+ Math.random().toString(36).substring(2, 9).toUpperCase();
}


export default router;