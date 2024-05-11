const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  fr: {
    lang: {
      type: String,
      default: "fr",
    },
    pageTitle: {
      type: String,
    },
    titleImg: {
      type: String,
    },
    titleH1Text: {
      type: String,
    },
    titleH2Text: {
      type: String,
    },
    pText1: {
      type: String,
    },
    pText2: {
      type: String,
    },
    pText3: {
      type: String,
    },
    pText4: {
      type: String,
    },
    img1: {
      type: String,
    },
    img2: {
      type: String,
    },
    img3: {
      type: String,
    },
    img4: {
      type: String,
    },
    imgText1: {
      type: String,
    },
    imgText2: {
      type: String,
    },
    imgText3: {
      type: String,
    },
    imgText4: {
      type: String,
    },
  },
  en: {
    lang: {
      type: String,
      default: "en",
    },
    pageTitle: {
      type: String,
    },
    titleImg: {
      type: String,
    },
    titleH1Text: {
      type: String,
    },
    titleH2Text: {
      type: String,
    },
    pText1: {
      type: String,
    },
    pText2: {
      type: String,
    },
    pText3: {
      type: String,
    },
    pText4: {
      type: String,
    },
    img1: {
      type: String,
    },
    img2: {
      type: String,
    },
    img3: {
      type: String,
    },
    img4: {
      type: String,
    },
    imgText1: {
      type: String,
    },
    imgText2: {
      type: String,
    },
    imgText3: {
      type: String,
    },
    imgText4: {
      type: String,
    },
  },
});

module.exports = mongoose.model("About", aboutSchema);
