const Header = require("./models/Header");
const Footer = require("./models/Footer");
const RecentPost = require("./models/RecentPost");

module.exports.get404Page = async (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  const header = await Header.findOne({}, { [lang]: 1 });
  const footer = await Footer.findOne({}, { [lang]: 1 });
  const post = await RecentPost.findOne({}, { ["recentPost"]: 1 });
  res.render("notfound", {
    header: header[lang],
    footer: footer[lang],
    recentPost: post.recentPost,
    path: "",
  });
};
