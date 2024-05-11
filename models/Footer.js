const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  fr: {
    lang: {
      type: String,
      default: "fr",
    },
    aText: {
      type: String,
    },
    pText: {
      type: String,
    },
    icon1: {
      type: String,
    },
    icon2: {
      type: String,
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
    navTitle: {
      type: String,
    },
    navbar: {
      homeNav: {
        type: String,
      },
      homeNavHref: {
        type: String,
      },
      aboutNav: {
        type: String,
      },
      aboutNavHref: {
        type: String,
      },
      servicesNav: {
        type: String,
      },
      servicesNavHref: {
        type: String,
      },
      blogNav: {
        type: String,
      },
      blogNavHref: {
        type: String,
      },
      carrierNav: {
        type: String,
      },
      carrierNavHref: {
        type: String,
      },
      contactNav: {
        type: String,
      },
      contactNavHref: {
        type: String,
      },
    },
    recentTitle: {
      type: String,
    },
    bottomPText: {
      type: String,
    },
    bottomAText: {
      type: String,
    },
    bottomAHref: {
      type: String,
    },
    facebookHref: {
      type: String,
    },
    facebookIcon: {
      type: String,
    },
    twitterHref: {
      type: String,
    },
    twitterIcon: {
      type: String,
    },
    instagramHref: {
      type: String,
    },
    instagramIcon: {
      type: String,
    },
    linkedlinHref: {
      type: String,
    },
    linkedlinIcon: {
      type: String,
    },
  },
  en: {
    lang: {
      type: String,
      default: "en",
    },
    aText: {
      type: String,
    },
    pText: {
      type: String,
    },
    icon1: {
      type: String,
    },
    icon2: {
      type: String,
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
    navTitle: {
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
    recentTitle: {
      type: String,
    },
    bottomPText: {
      type: String,
    },
    bottomAText: {
      type: String,
    },
    bottomAHref: {
      type: String,
    },
    facebookHref: {
      type: String,
    },
    facebookIcon: {
      type: String,
    },
    twitterHref: {
      type: String,
    },
    twitterIcon: {
      type: String,
    },
    instagramHref: {
      type: String,
    },
    instagramIcon: {
      type: String,
    },
    linkedlinHref: {
      type: String,
    },
    linkedlinIcon: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Footer", footerSchema);
