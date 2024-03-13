const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log("jwttoken: ", token);

  if (!token) {
    return res.redirect("/login");
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    console.log("token verified");
    next();
  } catch (error) {
    console.log("ERROR: ", error);
  }
};
module.exports = jwtAuth;
