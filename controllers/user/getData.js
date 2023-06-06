const UserData = require("../../db/models/userData");

module.exports = async (req, res, next) => {
    const uid = req.uid;
    let userData;

    try {
        userData = await UserData.findOne({ uid }, { data: 1, _id: 0 });
        if (!userData) {
            userData = {
                data: ""
            };
        }
    } catch (error) {
        return next(error);
    }
    res.json({ data: userData.data, status: true });
}