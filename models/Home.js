const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  fr: {
    lang: {
      type: String,
      default: "fr",
    },
    title: {
      type: String,
    },
    navbar: {
      type: String,
    },
    slide1: {
      slideImg: {
        type: String,
      },
      slideText: {
        type: String,
      },
    },
    slide2: {
      slideImg: {
        type: String,
      },
      slideText1: {
        type: String,
      },
      slideText2: {
        type: String,
      },
      slideButtonText: {
        type: String,
      },
    },
    slide3: {
      slideImg: {
        type: String,
      },
      slideText: {
        type: String,
      },
      slideImg1: {
        type: String,
      },
      slideImg2: {
        type: String,
      },
      slideImg3: {
        type: String,
      },
      slideImg4: {
        type: String,
      },
      slidePText1: {
        type: String,
      },
      slidePText2: {
        type: String,
      },
      slidePText3: {
        type: String,
      },
      slidePText4: {
        type: String,
      },
      slideButtonText: {
        type: String,
      },
    },
    Content: {
      h2Text: {
        type: String,
      },
      pText: {
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
      h3Text1: {
        type: String,
      },
      h3Text2: {
        type: String,
      },
      h3Text3: {
        type: String,
      },
      h3Text4: {
        type: String,
      },
    },
    Support: {
      h2Text: {
        type: String,
      },
      pText: {
        type: String,
      },
      inputPlaceHolder1: {
        type: String,
      },
      inputPlaceHolder2: {
        type: String,
      },
      inputPlaceHolder3: {
        type: String,
      },
      inputPlaceHolder4: {
        type: String,
      },
      buttonText: {
        type: String,
      },
    },
  },
  en: {
    lang: {
      type: String,
      default: "en",
    },
    title: {
      type: String,
    },
    navbar: {
      type: String,
    },
    slide1: {
      slideImg: {
        type: String,
      },
      slideText: {
        type: String,
      },
    },
    slide2: {
      slideImg: {
        type: String,
      },
      slideText1: {
        type: String,
      },
      slideText2: {
        type: String,
      },
      slideButtonText: {
        type: String,
      },
    },
    slide3: {
      slideImg: {
        type: String,
      },
      slideText: {
        type: String,
      },
      slideImg1: {
        type: String,
      },
      slideImg2: {
        type: String,
      },
      slideImg3: {
        type: String,
      },
      slideImg4: {
        type: String,
      },
      slidePText1: {
        type: String,
      },
      slidePText2: {
        type: String,
      },
      slidePText3: {
        type: String,
      },
      slidePText4: {
        type: String,
      },
      slideButtonText: {
        type: String,
      },
    },
    Content: {
      h2Text: {
        type: String,
      },
      pText: {
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
      h3Text1: {
        type: String,
      },
      h3Text2: {
        type: String,
      },
      h3Text3: {
        type: String,
      },
      h3Text4: {
        type: String,
      },
    },
    Support: {
      h2Text: {
        type: String,
      },
      pText: {
        type: String,
      },
      inputPlaceHolder1: {
        type: String,
      },
      inputPlaceHolder2: {
        type: String,
      },
      inputPlaceHolder3: {
        type: String,
      },
      inputPlaceHolder4: {
        type: String,
      },
      buttonText: {
        type: String,
      },
    },
  },
});

module.exports = mongoose.model("Home", HomeSchema);
