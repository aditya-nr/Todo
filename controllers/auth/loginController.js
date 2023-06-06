const Joi = require("joi");
const User = require("../../db/models/User");
const CustomError = require("../../lib/customErrorClass");
const { validPassword, issueJWT } = require("../../lib/utils");
const UserData = require("../../db/models/userData");
const Session = require("../../db/models/Session");


module.exports = async (req, res, next) => {

    const { uid, pwd } = req.body;

    //validation
    const registerSchema = Joi.object({
        uid: Joi.string().min(3).max(30).required(),
        pwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
    const { error } = registerSchema.validate({ uid, pwd });
    if (error) {
        return next(error);
    }
    // find user
    try {
        let user = await User.findOne({ uid });
        if (!user) {
            return next(CustomError.UserNotExist("User not exist"));
        }

        //validate password
        let isValid = validPassword(pwd, user.hash, user.salt);

        if (!isValid) {
            return next(CustomError.PasswordIsWrong());
        }

        let session = new Session({ uid });
        //store to db
        try {
            session = await session.save();
        } catch (error) {
            return next(error);
        }
        //sign token
        let auth = issueJWT({ uid, _id: session._id });
        //fetch data from of user
        let userData;
        userData = await UserData.findOne({ uid }, { data: 1, _id: 0 });
        if (!userData) {
            userData = { data: '' };
        }
        res.json({ status: "true", uid, auth, data: userData.data })
    } catch (error) {
        return next(error);
    }
}