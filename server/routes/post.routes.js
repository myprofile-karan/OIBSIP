const { getPosts } = require("../controllers/post.controller");
const { Router } = require("express");

const router = Router()

router.route("/posts").get(getPosts)

module.exports = router;