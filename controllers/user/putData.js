const UserData = require("../../db/models/userData");

module.exports = async (req, res, next) => {
    const uid = req.uid;
    const data = JSON.stringify(req.body.data);
    let userData = new UserData({ uid, data });

    //already some data
    try {
        let exist = await UserData.findOne({ uid }, { _id: 1 });
        if (!exist) {
            userData = await userData.save();
        } else {
            userData = await UserData.updateOne({ uid }, { data });
        }
    } catch (error) {
        return next(error);
    }
    //save data

    res.json({ status: true });
}