import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
const router = express.Router();

router.post('/register', async(req, res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(user){
        return res.status(400).json({message:"User Already Exists!"});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password:hashedPassword});
    await newUser.save();
    res.json({message:"User Added!"});
})

router.post('/login', async(req,res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.status(401).json({message:"User doesn't exist!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid Password!"});
    }

    const token = jwt.sign({id:user._id}, "envsecret");
    res.json({token, userID:user._id});
})

router.post('/cryptos', async(req,res)=>{
    const {userId} = req.body;
    const user = await UserModel.findOne({_id:userId});
    if(!user){
        return res.json({message:"User doesn't exist!"});
    }
    res.json({cryptos:user.cryptos});
})
router.put('/cryptos', async(req, res)=>{
    const {userId, cryptoName} = req.body;
    const crypto = cryptoName.toLowerCase();
    const user = await UserModel.findOne({_id:userId});
    if(!user){
        return res.status(401).json({message:"User doesn't exist!"});
    }
    let mycryptos = user.cryptos;
    if(mycryptos.includes(crypto)){
        return res.status(400).json({message:"Crypto Already Exists!"});
    }
    mycryptos.push(crypto);
    user.cryptos=mycryptos;
    user.save();
    res.json({message:"Successfully Added Crypto!"});
})
router.put('/cryptos/:userId/:crypto', async(req, res)=>{
    const userId = req.params.userId;
    const crypto = req.params.crypto;
    console.log(userId);
    const user = await UserModel.findOne({_id:userId});
    if(!user){
        return res.status(400).json({message:"User doesn't exist!"});
    }
    let mycryptos = user.cryptos;
    const index = mycryptos.indexOf(crypto);
    if(index>-1){
        mycryptos.splice(index,1);
    }
    user.cryptos=mycryptos;
    user.save();
    res.json({message:"Successfully deleted!"});

})


export {router as userRouter};
