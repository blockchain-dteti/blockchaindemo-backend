import jwt, { JwtPayload } from 'jsonwebtoken'
import { Secret } from 'jsonwebtoken'
const asyncHandler = require('express-async-handler')
import { Response, Request, NextFunction } from "express"
import User from "../models/User"

const protect = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1]
        
        if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined');

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

        // Get user from the token
        let user = await User.findById(decoded.id).select('-password')

        next()
        } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export default protect;