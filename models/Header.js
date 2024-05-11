const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema({
  fr: {
    lang: {
      type: String,
      default: "fr",
    },
    tel: {
      type: String,
    },
    telText: {
        type:String,
    },
    telOutText: {
        type:String,
    },
    emailText: {
        type:String,
    },
    emailOutText: {
        type:String,
    },
    email: {
      type: String,
    },
    logo: {
      type: String,
    },
    navbar: {
      homeNav: {
        type: String,
      },
      aboutNav: {
        type: String,
      },
      servicesNav: {
        type: String,
      },
      blogNav: {
        type: String,
      },
      carrierNav: {
        type: String,
      },
      contactNav: {
        type: String,
      },
    },
  },
  en: {
    lang: {
      type: String,
      default: "en",
    },
    tel: {
      type: String,
    },
    telText: {
        type:String,
    },
    telOutText: {
        type:String,
    },
    emailText: {
        type:String,
    },
    emailOutText: {
        type:String,
    },
    email: {
      type: String,
    },
    logo: {
      type: String,
    },
    navbar: {
      homeNav: {
        type: String,
      },
      aboutNav: {
        type: String,
      },
      servicesNav: {
        type: String,
      },
      blogNav: {
        type: String,
      },
      carrierNav: {
        type: String,
      },
      contactNav: {
        type: String,
      },
    },
  },
});

module.exports = mongoose.model("Header", headerSchema);
