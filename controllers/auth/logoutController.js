const Session = require("../../db/models/Session");
const CustomError = require("../../lib/customErrorClass");
const { verifyToken } = require("../../lib/utils");

module.exports = async (req, res, next) => {
    //get token
    const token = req.body.auth;
    if (!token) {
        return next(CustomError.Unauthorized());
    }
    //validate token
    const verification = verifyToken(token);
    if (!verification.isValid)
        return next(CustomError.Unauthorized())

    //validate session
    let _id = verification._id;
    try {
        await Session.deleteOne({ _id });

    } catch (error) {
        return next(error);
    }

    res.json({ msg: "Success" })
}