const mongoose = require("mongoose");
const recentPostSchema = new mongoose.Schema({
  recentPost: {
    fr: {
      title: {
        type: String,
      },
      img1: {
        type: String,
      },
      blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
      },
    },
    en: {
      title: {
        type: String,
      },
      img1: {
        type: String,
      },
      blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
      },
    },
  },
});

module.exports = mongoose.model("recentPost", recentPostSchema);
