import express from "express";
import User from "../models/user.model.js";

const router = express.Router();


//Advances Routing 

router.get("/", async (req, res) => {
    res.status(200).send("User Management of e-commerce API")
});

router.post("/register", async (req, res) => {

    try{
        const user = await User.create(req.body);

        res.status(201).json(user);
        //jwt token



    }
    catch(err){
        res.status(500).json(err);
    }

   
});

router.post("/login", async (req, res) => {
    res.status(200).send("Login Route");
});

router.get("/logout", async (req, res) => {
    res.status(200).send("Logout Route");
});

router.get("/profile", async (req, res) => {
    res.status(200).send("Profile Route");
});

router.put("/update", async (req, res) => {
    res.status(200).send("Update Route");
});

router.delete("/delete", async (req, res) => {
    res.status(200).send("Delete Route");
});



export default router;