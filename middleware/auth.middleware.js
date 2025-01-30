import jwt from "jsonwebtoken";



const auth = async (req, res, next) => {
    
try{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        //Bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }else{
        res.status(401).json({message:"You are unauthorized"});

        //key:values in js object
    }
}
catch(err){
    res.status(401).json({message: "You are unauthorized"});
}
}


const createToken = async (id)=>{
   
    const token = jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;

}

export { auth, createToken };