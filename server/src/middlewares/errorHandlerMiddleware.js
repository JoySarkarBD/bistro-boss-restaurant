const createError = require('http-errors');

//not found handler
const notFoundHandler = (req, res, next) => {
    return next(createError(404, '404 not found'))
}

//error handler
const errorHandler = (err, req, res, next) => {
    if (res?.headersSent) {
        return next(err)
    } else {
        const errCode = err.status || 500
        if (err.message) {
            res.status(errCode).json({
                msg: 'failed',
                err: err.message
            })
        } else {
            res.status(errCode).json({
                msg: 'failed',
                err: 'Internal server error'
            })
        }
    }
}

module.exports = {
    notFoundHandler,
    errorHandler
}