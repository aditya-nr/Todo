const { ValidationError } = require('joi');
const CustomError = require('../lib/customErrorClass');


module.exports = (err, req, res, next) => {
    let statusCode = 500;
    let data = {
        msg: 'Internal server Error'
    }

    if (err instanceof ValidationError) {
        data.msg = err.message;
    }

    else if (err instanceof CustomError) {
        data.msg = err.msg
        statusCode = err.status
    }
    data.status = false;
    res.status(statusCode).json(data);
}