const mongoose = require("mongoose");
const VideoSchema = new mongoose.Schema({

  VideoFile: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  Views: {
    type: Number,
  },
  isPublished: {
    type:Boolean,
  },

},{ timestamps: true });
module.exports = mongoose.model("Video", VideoSchema);
