const mongoose = require("mongoose");

const hammersmithSchema = new mongoose.Schema({
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
    titleH1Text1: {
      type: String,
    },
    pText1: {
      type: String,
    },
    strongText1: {
      type: String,
    },
    pText2: {
      type: String,
    },
    liText1: {
      type: String,
    },
    liText2: {
      type: String,
    },
    liText3: {
      type: String,
    },
    liText4: {
      type: String,
    },
    liText5: {
      type: String,
    },
    liText6: {
      type: String,
    },
    liText7: {
      type: String,
    },
    strongText2: {
      type: String,
    },
    pText3: {
      type: String,
    },
    liText7: {
      type: String,
    },
    liText8: {
      type: String,
    },
    liText9: {
      type: String,
    },
    pText4: {
      type: String,
    },
    titleH1Text2: {
      type: String,
    },
    pText5: {
      type: String,
    },
    quoteText1: {
      type: String,
    },
    titleH1Text3: {
      type: String,
    },
    pText6: {
      type: String,
    },
    img1: {
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
    titleH1Text4: {
      type: String,
    },
    pText7: {
      type: String,
    },
    panelTitleText1: {
      type: String,
    },
    panelPText1: {
      type: String,
    },
    panelTitleText2: {
      type: String,
    },
    panelPText2: {
      type: String,
    },
    panelTitleText3: {
      type: String,
    },
    panelPText3: {
      type: String,
    },
    titleH1Text5: {
      type: String,
    },
    pText8: {
      type: String,
    },
    liText10: {
      type: String,
    },
    liText11: {
      type: String,
    },
    liText12: {
      type: String,
    },
    liText13: {
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
    titleH1Text1: {
      type: String,
    },
    pText1: {
      type: String,
    },
    strongText1: {
      type: String,
    },
    pText2: {
      type: String,
    },
    liText1: {
      type: String,
    },
    liText2: {
      type: String,
    },
    liText3: {
      type: String,
    },
    liText4: {
      type: String,
    },
    liText5: {
      type: String,
    },
    liText6: {
      type: String,
    },
    liText7: {
      type: String,
    },
    strongText2: {
      type: String,
    },
    pText3: {
      type: String,
    },
    liText8: {
      type: String,
    },
    liText9: {
      type: String,
    },
    liText10: {
      type: String,
    },
    pText4: {
      type: String,
    },
    titleH1Text2: {
      type: String,
    },
    pText5: {
      type: String,
    },
    quoteText1: {
      type: String,
    },
    titleH1Text3: {
      type: String,
    },
    pText6: {
      type: String,
    },
    img1: {
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
    titleH1Text4: {
      type: String,
    },
    pText7: {
      type: String,
    },
    panelTitleText1: {
      type: String,
    },
    panelPText1: {
      type: String,
    },
    panelTitleText2: {
      type: String,
    },
    panelPText2: {
      type: String,
    },
    panelTitleText3: {
      type: String,
    },
    panelPText3: {
      type: String,
    },
    titleH1Text5: {
      type: String,
    },
    pText8: {
      type: String,
    },
    liText11: {
      type: String,
    },
    liText12: {
      type: String,
    },
    liText13: {
      type: String,
    },
    liText14: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Hammersmith", hammersmithSchema);
