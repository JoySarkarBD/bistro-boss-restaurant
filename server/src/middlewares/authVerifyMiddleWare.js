// verify access-token
const jwt = require('jsonwebtoken')
const UserModel = require("../models/UserModel");

const authVerifyMiddleWare = (req, res, next) => {

    const token = req.headers['authorization'] || req.headers['Authorization']

    if (token) {
        jwt.verify(token, '12345', async (error, decode) => {

            if (error) return res.sendStatus(403) //if jwt expired or any kind of jwt error
            //     find user from database & check it with decoded data

            let user = await UserModel.findById(decode?.userId).select('-password -createdAt -updatedAt');
            console.log(user)
            console.log(decode)
            if (user?._id && (user?.email === decode?.email)) {
                req.user = {
                    userId: user?._id,
                    name: user?.name,
                    email: user?.email,
                    roles: Object.values(user.roles).filter(Boolean)
                }
                next()
            } else {
                return res.status(401).json({
                    status: 'failed',
                    msg: 'Unauthorized user'
                })
            }

        })

    } else {
        res.status(401).json({
            status: 'failed',
            msg: 'Unauthorized user'

        })
    }
}

module.exports = authVerifyMiddleWare