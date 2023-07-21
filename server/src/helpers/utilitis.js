const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


//@desc all utilities function
const utilities = {}

// @desc hash password
utilities.hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt)
}

//  @desc verify password
utilities.verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}


// @desc generate token
utilities.generateAccessToken = (info, expireIn) => {
    return jwt.sign(
        {info}
        , '12345', {expiresIn: expireIn})
}


//  @desc generate cookies
utilities.generateCookies = (res, userInfo, cookieExpireTime, tokenExpireTime) => {
    const token = utilities.generateAccessToken(userInfo, tokenExpireTime)
    if (token) {
        return res.cookie('refreshToken', `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            maxAge: cookieExpireTime,
            sameSite: 'strict',
        })
    }
}


//  @desc generate time
utilities.generateTime = (milliseconds) => {
    return Date.now() + milliseconds
}

module.exports = utilities