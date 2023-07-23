const jwt = require('jsonwebtoken');
const createError = require('http-errors')
const UserModel = require("../models/UserModel");
const {response} = require("express");
const {generateAccessToken} = require("../helpers/utilitis");


// @desc generate refresh token
const refreshToken = (req, res, next) => {

    const token = req?.cookies['refreshToken']?.split(' ')[1]

    if (token) {
        jwt.verify(token, '12345', async (err, decode) => {
            if (err) return res.sendStatus(403)

            //     find user

            const user = await UserModel.findById(decode?.userId, {password: 0, updatedAt: 0, createdAt: 0})
            if (!user._id && user?.email !== decode.email) return response.sendStatus(401)

            //     create accessToken and send response
            const accessToken = generateAccessToken({userId: user?._id, email: user?.email}, '1d')

            const userInfo = {
                userId: user?._id,
                name: user?.name || 'anonymous',
                email: user?.email,
                verified: user?.verified,
                address: user?.address || false,

            }

            res.status(201).json({
                msg: 'success',
                data: {
                    accessToken,
                    userInfo,
                    roles: Object.values(user?.roles)?.filter(Boolean),
                }

            })
        })

    } else {
        return next(createError(401, 'Unauthorized user'))
    }
}

module.exports = {
    refreshToken
}