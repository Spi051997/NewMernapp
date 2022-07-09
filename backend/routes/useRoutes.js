const express = require("express");
const  router = express.Router();
const {registerUser,authUser,allUsers}=require('../controller/userControllers')
const { protect } = require("../middleware/authMiddleware");


router.post("/", registerUser);
router.post("/login", authUser);
router.route("/").get(protect, allUsers);   

module.exports = router;