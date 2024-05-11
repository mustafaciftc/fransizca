const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
    pText1: {
      type: String,
    },
    pText2: {
      type: String,
    },
    icon1: {
      type: String,
    },
    iconTitleText1: {
      type: String,
    },
    iconPText1: {
      type: String,
    },
    icon2: {
      type: String,
    },
    iconTitleText2: {
      type: String,
    },
    iconPText2: {
      type: String,
    },
    icon3: {
      type: String,
    },
    iconTitleText3: {
      type: String,
    },
    iconPText3: {
      type: String,
    },
    iconPText4: {
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
    pText1: {
      type: String,
    },
    pText2: {
      type: String,
    },
    icon1: {
      type: String,
    },
    iconTitleText1: {
      type: String,
    },
    iconPText1: {
      type: String,
    },
    icon2: {
      type: String,
    },
    iconTitleText2: {
      type: String,
    },
    iconPText2: {
      type: String,
    },
    icon3: {
      type: String,
    },
    iconTitleText3: {
      type: String,
    },
    iconPText3: {
      type: String,
    },
    iconPText4: {
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

module.exports = mongoose.model("Contact", contactSchema);
