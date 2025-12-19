const express = require("express");
const router = express.Router();

const { createUser } = require("../Controllers/UserController");
const upload = require("../multer");

router.post(
  "/registeruser",
  upload.single("avatar"), // 👈 MUST match Postman key
  createUser
);

module.exports = router;
