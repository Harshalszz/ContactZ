const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler( async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    let token ;
    if(authHeader && authHeader.startsWith('Bearer ')){
        token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.ACCESS_TOKEN, (err, decoded)=>{
            if(err){
                res.status(401)
                throw new Error('Invalid Token')
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(401)
            throw new Error('Token is mssing');
        }
    }
})

module.exports = validateToken;