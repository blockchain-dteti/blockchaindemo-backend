import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import { Request,Response } from 'express';

async function getUser(req:Request,res:Response){
    try{
        const users = await User.findAll({
            attributes: ['id', 'name']
        });
        res.json(users);
    } catch{
        console.log("Error");
        res.status(500).json({msg: "Error"});
    }
};

async function createUser(req:Request,res:Response){
    try{
        const {name, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            password
        });
        res.json(user);
    } catch{
        console.log("Error");
        res.status(500).json({msg: "Error"});
    }
};

async function login(req:Request,res:Response){
    try{
        const user = await users.findAll({
            where:{
                name: req.body.name
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match) res.status(400).json({msg: "Password tidak sesuai"})
        const userId = user[0].id
        const name = user[0].name
        const accessToken = jwt.sign({userId, name}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({userId, name}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        await users.update({refresh_token:refreshToken}, {
            where:{
                id:userId
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({accessToken})
    }catch{ 
        res.status(404).json({msg:"Username tidak ditemukan"})
    }
}

async function logout (req:Request,res:Response){
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await users.findAll({
        where:{
            refresh_token: refreshToken
       }
    })
    if(!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await users.update({refreshToken: null}, {
        where:{
            id: userId
        }
    })
    res.clearCookie('refreshToken');
    return res.sendStatus(200)
}

export {getUser, createUser, login, logout};