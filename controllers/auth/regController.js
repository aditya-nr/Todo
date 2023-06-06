const Joi = require('joi');

const User = require('../../db/models/User');
const Session = require('../../db/models/Session');
const CustomError = require('../../lib/customErrorClass');
const { genPassword, issueJWT } = require('../../lib/utils');

async function regController(req, res, next) {
    const { uid, pwd, cpwd } = req.body;

    //validation
    const registerSchema = Joi.object({
        uid: Joi.string().min(3).max(30).required(),
        pwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        cpwd: Joi.ref('pwd')
    });
    const { error } = registerSchema.validate({ uid, pwd, cpwd });
    if (error) {
        return next(error);
    }

    //user already exist
    try {
        let user = await User.findOne({ uid: uid });
        if (user) {
            return next(CustomError.UserAlreadyExist("user Already Exit"));
        }
    } catch (error) {
        return next(error)
    }

    //generate password and user
    let { salt, hash } = genPassword(pwd);
    let user = new User({ uid, hash, salt })

    // generate session
    let session = new Session({ uid });
    //store to db
    try {
        user = await user.save();
        session = await session.save();
    } catch (error) {
        return next(error);
    }


    //issue JWT
    let auth = issueJWT({ uid, _id: session._id });
    //res
    res.json({ status: true, auth, uid })
}

module.exports = regController;