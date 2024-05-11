const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
  },
  titleImg: {
    type: String,
  },
  titleH1Text1: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  dateIcon: {
    type: String,
    default: "fa-clock icn",
  },
  user: {
    type: String,
    default: "HammerSmith",
  },
  userIcon: {
    type: String,
    default: "fa-user icn",
  },
  content: {
    type: String,
  },
  lang: {
    type: String,
  },
});

module.exports = mongoose.model("blog", blogSchema);
