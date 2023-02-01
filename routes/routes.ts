import express from 'express';
import { getUser, newUser, login, logout } from '../controller/userController';
import { verifyToken } from '../middleware/verifyToken';
import { refreshToken } from '../controller/refreshToken';

const route = express.Router()

route.get('/users', verifyToken, getUser)
route.post('/users', newUser)
route.post('/login', login)
route.get('/token', refreshToken)
route.delete('/logout', logout)

export default route;