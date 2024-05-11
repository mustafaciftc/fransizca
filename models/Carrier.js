const mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema({
  fr: {
    lang: {
      type: String,
      default: "fr",
    },
    pageTitle: {
      type: String,
    },
    titleH2Text: {
      type: String,
    },
    titlePText: {
      type: String,
    },
    inputText1: {
      type: String,
    },
    inputText2: {
      type: String,
    },
    inputText3: {
      type: String,
    },
    inputText4: {
      type: String,
    },
    buttonText: {
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
    titleH2Text: {
      type: String,
    },
    titlePText: {
      type: String,
    },
    inputText1: {
      type: String,
    },
    inputText2: {
      type: String,
    },
    inputText3: {
      type: String,
    },
    inputText4: {
      type: String,
    },
    buttonText: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Carrier", carrierSchema);
