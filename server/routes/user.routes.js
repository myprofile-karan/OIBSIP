const { registerUser, getUser } = require("../controllers/user.controller");
const { Router } = require("express");

const router = Router()

router.route("/signup").post(registerUser)
router.route("/signup").get(getUser)

module.exports = router;