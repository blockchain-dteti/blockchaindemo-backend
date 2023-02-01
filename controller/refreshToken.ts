import users from '../models/User';
import jwt from 'jsonwebtoken';

let refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await users.findAll({
            where:{
                refresh_token: refreshToken
            }
        })
        if(!user[0]) return res.sendStatus(403)
        if(!process.env.REFRESH_TOKEN_SECRET) return res.sendStatus(500).json({msg: "Refresh token secret not found"})
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403)
            const userId = user[0].id;
            const name = user[0].name;
            const accessToken = jwt.sign({userId, name}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })
            res.json({accessToken})

        })
    } catch (error) {
        console.log(error);
    }
}

export default refreshToken;