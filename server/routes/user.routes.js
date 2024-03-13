const { registerUser, getUser, loginUser, checkUser } = require("../controllers/user.controller");
const { Router } = require("express");

const router = Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)

router.route("/signup").get(getUser)
router.route("/check-user/:username").get(checkUser)

module.exports = router;