const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  fr: {
    lang: {
      type: String,
      default: "fr",
    },
    pageTitle: {
      type: String,
    },
    title: {
      type: String,
    },
    head: {
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
      pText5: {
        type: String,
      },
      pText6: {
        type: String,
      },
    },
    content: {
      img1: {
        type: String,
      },
      h2Text1: {
        type: String,
      },
      liText1: {
        type: String,
      },
      contentPText1: {
        type: String,
      },
      img2: {
        type: String,
      },
      h2Text2: {
        type: String,
      },
      liText2: {
        type: String,
      },
      contentPText2: {
        type: String,
      },
      img3: {
        type: String,
      },
      h2Text3: {
        type: String,
      },
      liText3: {
        type: String,
      },
      contentPText3: {
        type: String,
      },
      img4: {
        type: String,
      },
      h2Text4: {
        type: String,
      },
      liText4: {
        type: String,
      },
      contentPText4: {
        type: String,
      },
    },
    bottom: {
      backendImg: {
        type: String,
      },
      icon1: {
        type: String,
      },
      icon2: {
        type: String,
      },
      icon3: {
        type: String,
      },
      icon4: {
        type: String,
      },
      icon5: {
        type: String,
      },
      icon6: {
        type: String,
      },
      iconText1: {
        type: String,
      },
      iconText2: {
        type: String,
      },
      iconText3: {
        type: String,
      },
      iconText4: {
        type: String,
      },
      iconText5: {
        type: String,
      },
      iconText6: {
        type: String,
      },
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
    title: {
      type: String,
    },
    head: {
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
      pText5: {
        type: String,
      },
      pText6: {
        type: String,
      },
    },
    content: {
      img1: {
        type: String,
      },
      h2Text1: {
        type: String,
      },
      liText1: {
        type: String,
      },
      contentPText1: {
        type: String,
      },
      img2: {
        type: String,
      },
      h2Text2: {
        type: String,
      },
      liText2: {
        type: String,
      },
      contentPText2: {
        type: String,
      },
      img3: {
        type: String,
      },
      h2Text3: {
        type: String,
      },
      liText3: {
        type: String,
      },
      contentPText3: {
        type: String,
      },
      img4: {
        type: String,
      },
      h2Text4: {
        type: String,
      },
      liText4: {
        type: String,
      },
      contentPText4: {
        type: String,
      },
    },
    bottom: {
      backendImg: {
        type: String,
      },
      icon1: {
        type: String,
      },
      icon2: {
        type: String,
      },
      icon3: {
        type: String,
      },
      icon4: {
        type: String,
      },
      icon5: {
        type: String,
      },
      icon6: {
        type: String,
      },
      iconText1: {
        type: String,
      },
      iconText2: {
        type: String,
      },
      iconText3: {
        type: String,
      },
      iconText4: {
        type: String,
      },
      iconText5: {
        type: String,
      },
      iconText6: {
        type: String,
      },
    },
  },
});

module.exports = mongoose.model("Services", servicesSchema);
