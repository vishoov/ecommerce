import express from "express";
import User from "../models/user.model.js";
import { auth, createToken } from "../middleware/auth.middleware.js";


const router = express.Router();


 

router.get("/", async (req, res) => {
    try{
        const user = await User.find();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post("/register", async function(req, res){

    try{
        const user = await User.create(req.body);
        //this is where your user data is stored in the database

        if(!user){
            res.status(400).json({message:"User Registration Failed"});
        }
     
        //jwt token

        const payload = {
            user:{
                id: user.email
            }
        }

        const token = await createToken(payload);
        
        if(!token){
            res.status(400).json({message:"Token Generation Failed"});
        }

      

        res.status(201).send({message:"User Registration Success", token:token});
    


    }
    catch(err){
        res.status(500).json(err);
    }

   
});

router.post("/login", async function(req, res){
    
    const { email, password }= req.body;

    try{
        const user = await User.findOne({email : email});

        if(!user){
            res.status(404).json({message:"User Doesnt Exist"});

        }

        const isPassCorrect = await user.comparePassword(password);

        if(!isPassCorrect){
            res.status(400).json({message:"Invalid Credentials"});
        }

        res.status(200).json({message:"Login Success"});
    }
    catch(err){
        res.status(500).json(err);
    }
});



router.post("/logout", async (req, res) => {
   
    try{
        
        //logout logic
        //implementing the logout logic on the front end
        //add the token to a blacklist
        //delete the token from the client side
        //redis cache the token -> add the token to blacklist

        res.status(200).json({message:"Logout Success"});

    }
    catch(err){
        res.status(500).json(err);
    }

});

router.get("/profile/:username", async (req, res) => {
    
    try{
        const username = req.params.username;

        const user = await User.findOne({name:username});
        if(!user){
            res.status(404).json({message:"User Not Found"});
        }

        res.status(201).json(user);

    }
    catch(err)
    {
        res.status(500).json(err);
    }

});

router.put("/update", async (req, res) => {
    try {
        const { email,  ...updateData } = req.body;

        //{
        //   email: "email",
        //   address: " updated address ",
        // }


        const user = await User.findOneAndUpdate(
            { email: email },
            updateData,
            { new: true, runValidators: true }
            //new: true -> return the updated document
            //runValidators: true -> run the validators in the model
        );

        if (!user) {
            return res.status(404).json({message: "User Not Found"});
        }

        res.status(200).json(user);
    }
    catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({message: "Internal Server Error"});
    }
});

router.delete("/delete", async (req, res) => {
   
    try{
        const email = req.body.email;

        const user = await User.findOneAndDelete({email:email});

        if(!user){
            res.status(404).json({message:"User Not Found"});
        }

        res.status(200).json({message:"User Deleted Successfully"});
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Cart Routes

//Check Cart 
router.get("/cart", async (req, res)=>{
    try{
        const cart = await Cart.findOne({user: req.user._id}).populate('items.product');
        //this would fetch the cart of a user and populate
        //the items with the product details
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
        
    }
})


//Add to Cart
router.post("/cart/add", async (req, res)=>{
    try{
        const { productId, quantity } = req.body;{
        const product = await Product.findById(productId);
        
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        let cart = req.session.cart ? req.session.cart :{};

        if(!cart){
            //new: is used to create a new "document" in the database 
            //after new User/Product/Cart model which is being created
            cart = new Cart({
                user: req.user._id,
                cartItems: [],
            });
        }


        let item = cart.items.find(i => i.product.toString() === productId);

        if(item > -1){
            cart.items[item].quantity += quantity;
        }else{
            cart.items.push({
                product: productId,
                quantity: quantity,
                price: product.price,
            })
        }
    
        await Cart.save();
        res.status(201).json(cart);
    }
    }
    catch(err){
        res.status(500).json(err);
    }
})



export default router;