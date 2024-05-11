const mongoose = require("mongoose");

const detailSidebarSchema = new mongoose.Schema({
  fr: {
    lang: {
      type: String,
      default: "fr",
    },
    barTitleText: {
      type: String,
    },
    barText1: {
      type: String,
    },
    barText2: {
      type: String,
    },
    barText3: {
      type: String,
    },
  },
  en: {
    lang: {
      type: String,
      default: "fr",
    },
    barTitleText: {
      type: String,
    },
    barText1: {
      type: String,
    },
    barText2: {
      type: String,
    },
    barText3: {
      type: String,
    },
  },
});

module.exports = mongoose.model("detailsidebar", detailSidebarSchema);
