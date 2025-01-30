import express from "express"
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userRoutes from "./controller/user.routes.js";
app.use(express.json());
import productRoutes from "./controller/product.routes.js";
import orderRoutes from "./controller/order.routes.js";
import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err)
});


app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Root route of e-commerce API")
})




app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)

})
