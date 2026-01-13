const Video = require("../Models/Video.models");

/*
 * CREATE VIDEO
 * Logged-in user creates a video
 */
const createVideo = async (req, res) => {
  try {
    // 🔐 user id comes from JWT middleware
   const userId = req.user.userId;


    const {
      title,
      description,
      duration,
      isPublished
    } = req.body;

    // 🧠 files come from multer
    const videoFile = req.files?.VideoFile?.[0]?.path;
    const thumbnail = req.files?.thumbnail?.[0]?.path;

    if (!videoFile) {   
      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });
    }

    const video = await Video.create({
      title,
      description,
      duration,
      VideoFile: videoFile,
      thumbnail: thumbnail,
      owner: userId,        // 🔥 automatically set
      Views: 0,
      isPublished: isPublished ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Video created successfully",
      video,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create video",
      error: error.message,
    });
  }
};

/**
 * GET ALL VIDEOS
 */
// const getAllVideos = async (req, res) => {
//   try {
//     const videos = await Video.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       videos,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

/**
 * GET VIDEOS OF LOGGED-IN USER
 */
// const getMyVideos = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const videos = await Video.find({ owner: userId });

//     res.status(200).json({
//       success: true,
//       videos,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

/**
 * GET SINGLE VIDEO
 */
// const getSingleVideo = async (req, res) => {
//   try {
//     const video = await Video.findById(req.params.id);

//     if (!video) {
//       return res.status(404).json({
//         success: false,
//         message: "Video not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       video,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

module.exports = {
  createVideo,
//   getAllVideos,
//   getMyVideos,
//   getSingleVideo,
};
