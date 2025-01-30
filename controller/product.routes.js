import express from "express";
const router = express();

import Product from "../models/product.model.js";
import { auth } from "../middleware/auth.middleware.js";

//add a product
router.post("/add", auth,async (req, res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
})



//search for all products
router.get("/", async (req, res)=>{{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
    }
}})



//search for a product by name
router.get("/search", async (req, res)=>{
    try{
        const product = await Product.find({name: req.body.name});

        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//update a product
router.put("/update", auth, async (req, res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.body.id, req.body, {new:true});
        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//search for a product by category
router.get("/category", async (req, res)=>{
    try{
        const products = await Product.find({category: req.body.category});
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
    }
})



//search for a product by seller
router.get("/seller", async (req, res)=>{
    try{
        const products = await Product.find({seller: req.body.seller});
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
    }
});




//delete a product
router.delete("/delete", auth, async (req, res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.body.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
});



//add a review to a product
router.put("/review", auth, async (req, res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.body.id, 
            {$push: {reviews: req.body.review}}, 
            {new:true});
        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
})




//delete a review from a product

router.put("/review/delete", auth, async (req, res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.body.id, 
            {$pull: {reviews: req.body.review}}, 
            {new:true});
        res.status(201).json(product);
    }
    catch(err){
        res.status(500).json(err);
    }
});





export default router; 