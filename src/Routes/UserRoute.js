const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../Controllers/UserController");
const upload = require("../multer");

router.post(
  "/registeruser",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createUser
);

router.post("/loginUser", loginUser);

module.exports = router;
