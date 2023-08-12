const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req,res)=>{
    const {name, email, password} = req.body;
    console.log(req.body);
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill all the fields')
    }
    const avaibleUser = await User.findOne({email});
    if(avaibleUser){
        res.status(400)
        throw new Error('User is avaible already')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashPassword
    })
    console.log(user)
    console.log("hash password", hashPassword);
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400)
        throw new Error('Something went wrong')
    }

    //res.status(201).json({status: "registered successfully"})
});

const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('Please fill all the fields')
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user : {
                id: user.id,
                username: user.name,
                email: user.email
            },
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: "15m"
        }
    );
    console.log("accessToken:" , accessToken);
    res.status(200).send(accessToken);

    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    //res.status(201).json({status: "login successfully"})
});

const currentUser = asyncHandler(async (req,res)=>{
    res.status(201).json(req.user)
});

module.exports ={registerUser, loginUser, currentUser}