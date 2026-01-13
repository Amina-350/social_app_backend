const express = require("express");
const router = express.Router();
const {AuthenticationMiddleware} = require("../Middlewares/AuthenticationMiddleware");
const upload = require("../multer");
const {
  createVideo,
//   getAllVideos,
//   getMyVideos,
//   getSingleVideo
} = require("../Controllers/VedioController");

router.post(
  "/create",
  AuthenticationMiddleware,
  upload.fields([
    { name: "VideoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  createVideo
);

// router.get("/", getAllVideos);
// router.get("/my-videos", authMiddleware, getMyVideos);
// router.get("/:id", getSingleVideo);

module.exports = router;
