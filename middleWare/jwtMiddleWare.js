const jwt = require('jsonwebtoken')

exports.jwtMiddleware = (req, res, next) => {
    console.log("Inside jwtMiddleware");

    try{
        const token = req.headers["authorization"].split(" ")[1]
        if(token){
            const jwtResponse = jwt.verify(token, process.env.JWT_Key)
            
            req.payload = jwtResponse.userId
            next()
        }else{
            res.status(401).json("Please provide token")
        }
    }catch(err){
        res.status(403).json("Please login")
    }
}

exports.verifyAdmin = (req, res, next) => {
    console.log("Inside verifyAdmin");

    const token = req.headers["authorization"].split(" ")[1]
    if (!token) return res.status(401).json("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_Key)
        
        if (verified.role !== "admin") return res.status(403).json("Not authorized");
        
        req.admin = verified;
        next();
    } catch (err) {
        res.status(400).json(err);
    }
};

