const multer = require("multer");
const path = require("path");

// const path=require('./uploads');

// absolute path to src/uploads
const uploadDir = path.join(__dirname, "uploads");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
