const express = require("express");
const Router = express.Router();
const Home = require("./models/Home");
const Header = require("./models/Header");
const Footer = require("./models/Footer");
const About = require("./models/About");
const Services = require("./models/Services");
const Compliance = require("./models/Compliance");
const Hammersmith = require("./models/Hammersmith");
const detailSidebar = require("./models/detailSidebar");
const Conseil = require("./models/Conseil");
const Carrier = require("./models/Carrier");
const Contact = require("./models/Contact");
const Blog = require("./models/Blog");
const RecentPost = require("./models/RecentPost");

Router.get("/", (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Home.findOne({}, { [lang]: 1 }).then(async (home) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const footer = await Footer.findOne({}, { [lang]: 1 });
    const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
    res.render("home", {
      home: home[lang],
      header: header[lang],
      footer: footer[lang],
      path: "/home",
      recentPost: post?.recentPost[lang],
    });
  });
});

Router.get("/about", (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  About.findOne({}, { [lang]: 1 }).then(async (about) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const footer = await Footer.findOne({}, { [lang]: 1 });
    const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
    res.render("about", {
      about: about[lang],
      header: header[lang],
      footer: footer[lang],
      path: "/about",
      recentPost: post?.recentPost[lang],
    });
  });
});

Router.get("/services", (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Services.findOne({}, { [lang]: 1 }).then(async (services) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const footer = await Footer.findOne({}, { [lang]: 1 });
    const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
    res.render("services", {
      services: services[lang],
      header: header[lang],
      footer: footer[lang],
      path: "/services",
      recentPost: post?.recentPost[lang],
    });
  });
});

Router.get("/service-details/:serviceName", (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  if (req.params.serviceName === "compliance") {
    Compliance.findOne({}, { [lang]: 1 }).then(async (compliance) => {
      const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
      const header = await Header.findOne({}, { [lang]: 1 });
      const footer = await Footer.findOne({}, { [lang]: 1 });
      const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
      res.render("detailsPage/compliance", {
        compliance: compliance[lang],
        header: header[lang],
        footer: footer[lang],
        sidebar: sidebar[lang],
        path: "/services",
        pathSidebar: "/service-details/compliance",
        recentPost: post?.recentPost[lang],
      });
    });
  }
  if (req.params.serviceName === "conseil-en-risques") {
    Conseil.findOne({}, { [lang]: 1 }).then(async (conseil) => {
      const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
      const header = await Header.findOne({}, { [lang]: 1 });
      const footer = await Footer.findOne({}, { [lang]: 1 });
      const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
      res.render("detailsPage/conseil", {
        conseil: conseil[lang],
        sidebar: sidebar[lang],
        header: header[lang],
        footer: footer[lang],
        path: "/services",
        pathSidebar: "/service-details/conseil",
        recentPost: post?.recentPost[lang],
      });
    });
  }
  if (
    req.params.serviceName === "hammersmith-services-de-conseil-en-informatique"
  ) {
    Hammersmith.findOne({}, { [lang]: 1 }).then(async (hammersmith) => {
      const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
      const header = await Header.findOne({}, { [lang]: 1 });
      const footer = await Footer.findOne({}, { [lang]: 1 });
      const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
      res.render("detailsPage/hammersmith", {
        hammersmith: hammersmith[lang],
        sidebar: sidebar[lang],
        header: header[lang],
        footer: footer[lang],
        path: "/services",
        pathSidebar: "/service-details/hammersmith",
        recentPost: post?.recentPost[lang],
      });
    });
  }
});

Router.get("/carrier", (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Carrier.findOne({}, { [lang]: 1 }).then(async (carrier) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const footer = await Footer.findOne({}, { [lang]: 1 });
    const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
    res.render("carrier", {
      carrier: carrier[lang],
      header: header[lang],
      footer: footer[lang],
      path: "/carrier",
      recentPost: post?.recentPost[lang],
    });
  });
});

Router.get("/contact", (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Contact.findOne({}, { [lang]: 1 }).then(async (contact) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const footer = await Footer.findOne({}, { [lang]: 1 });
    const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
    res.render("contact", {
      contact: contact[lang],
      header: header[lang],
      footer: footer[lang],
      path: "/contact",
      recentPost: post?.recentPost[lang],
    });
  });
});

Router.get("/blog", async (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Blog.find({ lang: lang }).then(async (blogs) => {
    blogs = blogs.reverse();
    const header = await Header.findOne({}, { [lang]: 1 });
    const footer = await Footer.findOne({}, { [lang]: 1 });
    const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
    res.render("blog", {
      blogs,
      header: header[lang],
      footer: footer[lang],
      path: "/blog",
      recentPost: post?.recentPost[lang],
      lang,
    });
  });
});

Router.get("/blog-detail/:blogId", (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Blog.findById(req.params.blogId).then(async (blog) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const footer = await Footer.findOne({}, { [lang]: 1 });
    const post = await RecentPost.findOne({}, { [`recentPost.${lang}`]: 1 });
    res.render("blog-detail", {
      blog,
      header: header[lang],
      footer: footer[lang],
      path: "/blog",
      recentPost: post?.recentPost[lang],
    });
  });
});

module.exports = Router;
