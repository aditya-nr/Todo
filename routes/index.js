const router = require('express').Router();
const loginController = require('../controllers/auth/loginController');
const logoutController = require('../controllers/auth/logoutController');
const regController = require('../controllers/auth/regController');
const getData = require('../controllers/user/getData');
const putData = require('../controllers/user/putData');
const auth = require('../middleware/auth');


router.post("/reg", regController)
router.post('/login', loginController);
router.post('/logout', logoutController);

router.post("/data", auth, getData);
router.put("/data", auth, putData);

module.exports = router;