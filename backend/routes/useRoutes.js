const express = require("express");
const  router = express.Router();
const {registerUser,authUser}=require('../controller/userControllers')


// router.route("/").get(protect, allUsers);
// router.route("/").post(registerUser);
router.post("/", registerUser);
router.post("/login", authUser);


module.exports = router;