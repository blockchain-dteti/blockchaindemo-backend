import express from 'express'                          // import express

import { registerUser,loginUser, getMe } from '../controller/userController'
const route = express.Router()                          // create router





route.post('/api/register', registerUser)
route.post('/api/login', loginUser)
route.get('/api/me', getMe)

// Export route
export default route;