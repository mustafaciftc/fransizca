const express = require("express");
const Router = express.Router();
const Header = require("./models/Header");
const Home = require("./models/Home");
const About = require("./models/About");
const Services = require("./models/Services");
const Carrier = require("./models/Carrier");
const Contact = require("./models/Contact");
const detailSidebar = require("./models/detailSidebar");
const Conseil = require("./models/Conseil");
const Compliance = require("./models/Compliance");
const Hammersmith = require("./models/Hammersmith");
const User = require("./models/User");
const Login = require("./models/Login");
const Footer = require("./models/Footer");
const Blog = require("./models/Blog");
const RecentPost = require("./models/RecentPost");

const Auth = (req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  return next();
};

const isAuthenticated = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return res.redirect("/");
  }
  return next();
};

Router.get("/header", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Header.findOne({}, { [lang]: 1 }).then(async (header) => {
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminHeader", {
      header: header[lang],
      sidebar: sidebar[lang],
      blogs,
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/header", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  const tel = req.body.tel;
  const email = req.body.email;
  const nav1 = req.body.nav1;
  const nav2 = req.body.nav2;
  const nav3 = req.body.nav3;
  const nav4 = req.body.nav4;
  const nav5 = req.body.nav5;
  const nav6 = req.body.nav6;
  Header.findOne({}, { [lang]: 1 }).then(async (header) => {
    header[lang].tel = tel;
    header[lang].email = email;
    header[lang].navbar.homeNav = nav1;
    header[lang].navbar.aboutNav = nav2;
    header[lang].navbar.servicesNav = nav3;
    header[lang].navbar.blogNav = nav4;
    header[lang].navbar.carrierNav = nav5;
    header[lang].navbar.contactNav = nav6;
    header[lang].telText = req.body.telText;
    header[lang].emailText = req.body.emailText;
    header[lang].telOutText = req.body.telOutText;
    header[lang].emailOutText = req.body.emailOutText;
    if (req.files?.logo?.length > 0) {
      // const filePath =
      //   req.files.logo[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.logo[0].filename;
      // header[lang].logo = filePath;
      const fileUpload = req.bucket.file(req.files.logo[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      header[
        lang
      ].logo = `https://storage.googleapis.com/bucketsimage/${req.files.logo[0].originalname}`;
      blobStream.end(req.files.logo[0].buffer);
    }
    header.save().then(() => {
      res.redirect("/admin/header?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err)
        }
        res.redirect("/admin/header?action=error")
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/header?action=error")
  })
});

Router.get("/home", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Home.findOne({}, { [lang]: 1 }).then(async (home) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminHome", {
      home: home[lang],
      header: header[lang],
      blogs,
      sidebar: sidebar[lang],
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/home", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  Home.findOne({}, { [lang]: 1 }).then((home) => {
    home[lang].title = req.body.title ? req.body.title : home[lang].title;
    if (req.files.slide1Img?.length > 0) {
      // const filePath =
      //   req.files.slide1Img[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.slide1Img[0].filename;
      // home[lang].slide1.slideImg = filePath;
      const fileUpload = req.bucket.file(req.files.slide1Img[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].slide1.slideImg = `https://storage.googleapis.com/bucketsimage/${req.files.slide1Img[0].originalname}`;
      blobStream.end(req.files.slide1Img[0].buffer);
    }
    home[lang].slide1.slideText = req.body.slide1Text;
    if (req.files.slide2Img?.length > 0) {
      // const filePath =
      //   req.files.slide2Img[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.slide2Img[0].filename;
      // home[lang].slide2.slideImg = filePath;
      const fileUpload = req.bucket.file(req.files.slide2Img[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].slide2.slideImg = `https://storage.googleapis.com/bucketsimage/${req.files.slide2Img[0].originalname}`;
      blobStream.end(req.files.slide2Img[0].buffer);
    }
    home[lang].slide2.slideText1 = req.body.slide2Text1;
    home[lang].slide2.slideText2 = req.body.slide2Text2;
    home[lang].slide2.slideButtonText = req.body.slide2ButtonText;
    if (req.files?.slide3BackendImg?.length > 0) {
      // const filePath =
      //   req.files.slide3BackendImg[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.slide3BackendImg[0].filename;
      // home[lang].slide3.slideImg = filePath;
      const fileUpload = req.bucket.file(
        req.files.slide3BackendImg[0].originalname
      );
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].slide3.slideImg = `https://storage.googleapis.com/bucketsimage/${req.files.slide3BackendImg[0].originalname}`;
      blobStream.end(req.files.slide3BackendImg[0].buffer);
    }
    home[lang].slide3.slideText = req.body.slide3Text1;
    // home[lang].slide3.slideImg1
    if (req.files.slide3Img1?.length > 0) {
      // const filePath =
      //   req.files.slide3Img1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.slide3Img1[0].filename;
      // home[lang].slide3.slideImg1 = filePath;
      const fileUpload = req.bucket.file(req.files.slide3Img1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].slide3.slideImg1 = `https://storage.googleapis.com/bucketsimage/${req.files.slide3Img1[0].originalname}`;
      blobStream.end(req.files.slide3Img1[0].buffer);
    }
    // home[lang].slide3.slideImg2
    if (req.files.slide3Img2?.length > 0) {
      // const filePath =
      //   req.files.slide3Img2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.slide3Img2[0].filename;
      // home[lang].slide3.slideImg2 = filePath;
      const fileUpload = req.bucket.file(req.files.slide3Img2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].slide3.slideImg2 = `https://storage.googleapis.com/bucketsimage/${req.files.slide3Img2[0].originalname}`;
      blobStream.end(req.files.slide3Img2[0].buffer);
    }
    // home[lang].slide3.slideImg3
    if (req.files.slide3Img3?.length > 0) {
      // const filePath =
      //   req.files.slide3Img3[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.slide3Img3[0].filename;
      // home[lang].slide3.slideImg3 = filePath;
      const fileUpload = req.bucket.file(req.files.slide3Img3[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].slide3.slideImg3 = `https://storage.googleapis.com/bucketsimage/${req.files.slide3Img3[0].originalname}`;
      blobStream.end(req.files.slide3Img3[0].buffer);
    }
    // home[lang].slide3.slideImg4
    if (req.files.slide3Img4?.length > 0) {
      // const filePath =
      //   req.files.slide3Img4[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.slide3Img4[0].filename;
      // home[lang].slide3.slideImg4 = filePath;
      const fileUpload = req.bucket.file(req.files.slide3Img4[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].slide3.slideImg4 = `https://storage.googleapis.com/bucketsimage/${req.files.slide3Img4[0].originalname}`;
      blobStream.end(req.files.slide3Img4[0].buffer);
    }
    home[lang].slide3.slidePText1 = req.body.slide3PText1;
    home[lang].slide3.slidePText2 = req.body.slide3PText2;
    home[lang].slide3.slidePText3 = req.body.slide3PText3;
    home[lang].slide3.slidePText4 = req.body.slide3PText4;
    home[lang].slide3.slideButtonText = req.body.slide3ButtonText;
    home[lang].Content.h2Text = req.body.contentH2Text;
    home[lang].Content.pText = req.body.contentPText;
    //home[lang].Content.img1
    if (req.files.contentImg1?.length > 0) {
      // const filePath =
      //   req.files.contentImg1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.contentImg1[0].filename;
      // home[lang].Content.img1 = filePath;
      const fileUpload = req.bucket.file(req.files.contentImg1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].Content.img1 = `https://storage.googleapis.com/bucketsimage/${req.files.contentImg1[0].originalname}`;
      blobStream.end(req.files.contentImg1[0].buffer);
    }
    //home[lang].Content.img2
    if (req.files.contentImg2?.length > 0) {
      // const filePath =
      //   req.files.contentImg2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.contentImg2[0].filename;
      // home[lang].Content.img2 = filePath;
      const fileUpload = req.bucket.file(req.files.contentImg2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].Content.img2 = `https://storage.googleapis.com/bucketsimage/${req.files.contentImg2[0].originalname}`;
      blobStream.end(req.files.contentImg2[0].buffer);
    }
    //home[lang].Content.img3
    if (req.files.contentImg3?.length > 0) {
      // const filePath =
      //   req.files.contentImg3[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.contentImg3[0].filename;
      // home[lang].Content.img3 = filePath;
      const fileUpload = req.bucket.file(req.files.contentImg3[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].Content.img3 = `https://storage.googleapis.com/bucketsimage/${req.files.contentImg3[0].originalname}`;
      blobStream.end(req.files.contentImg3[0].buffer);
    }
    //home[lang].Content.img4
    if (req.files.contentImg4?.length > 0) {
      // const filePath =
      //   req.files.contentImg4[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.contentImg4[0].filename;
      // home[lang].Content.img4 = filePath;
      const fileUpload = req.bucket.file(req.files.contentImg4[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      home[
        lang
      ].Content.img4 = `https://storage.googleapis.com/bucketsimage/${req.files.contentImg4[0].originalname}`;
      blobStream.end(req.files.contentImg4[0].buffer);
    }
    home[lang].Content.h3Text1 = req.body.contentH3Text1;
    home[lang].Content.h3Text2 = req.body.contentH3Text2;
    home[lang].Content.h3Text3 = req.body.contentH3Text3;
    home[lang].Content.h3Text4 = req.body.contentH3Text4;
    home[lang].Support.h2Text = req.body.supportH2Text;
    home[lang].Support.pText = req.body.supportPText;
    home[lang].Support.buttonText = req.body.supportButtonText;
    home[lang].Support.inputPlaceHolder1 = req.body.supportInputText1;
    home[lang].Support.inputPlaceHolder2 = req.body.supportInputText2;
    home[lang].Support.inputPlaceHolder3 = req.body.supportInputText3;
    home[lang].Support.inputPlaceHolder4 = req.body.supportInputText4;
    home.save().then(() => {
      res.redirect("/admin/home?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err)
        }
        res.redirect("/admin/home?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/home?action=error");
  })
});

Router.get("/about", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  About.findOne({}, { [lang]: 1 }).then(async (about) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    res.render("adminAbout", {
      about: about[lang],
      header: header[lang],
      blogs,
      sidebar: sidebar[lang],
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/about", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  About.findOne({}, { [lang]: 1 }).then((about) => {
    about[lang].pageTitle = req.body.pageTitle;
    if (req.files.titleImg?.length > 0) {
      // const filePath =
      //   req.files.titleImg[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.titleImg[0].filename;
      // about[lang].titleImg = filePath;
      const fileUpload = req.bucket.file(req.files.titleImg[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      about[
        lang
      ].titleImg = `https://storage.googleapis.com/bucketsimage/${req.files.titleImg[0].originalname}`;
      blobStream.end(req.files.titleImg[0].buffer);
    }
    about[lang].titleH1Text = req.body.titleH1Text;

    about[lang].titleH2Text = req.body.titleH2Text;

    about[lang].pText1 = req.body.pText1 ? req.body.pText1 : about[lang].pText1;
    if (req.files.img1?.length > 0) {
      // const filePath =
      //   req.files.img1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img1[0].filename;
      // about[lang].img1 = filePath;
      const fileUpload = req.bucket.file(req.files.img1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      about[
        lang
      ].img1 = `https://storage.googleapis.com/bucketsimage/${req.files.img1[0].originalname}`;
      blobStream.end(req.files.img1[0].buffer);
    }
    about[lang].imgText1 = req.body.imgText1;
    if (req.files.img2?.length > 0) {
      // const filePath =
      //   req.files.img2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img2[0].filename;
      // about[lang].img2 = filePath;
      const fileUpload = req.bucket.file(req.files.img2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      about[
        lang
      ].img2 = `https://storage.googleapis.com/bucketsimage/${req.files.img2[0].originalname}`;
      blobStream.end(req.files.img2[0].buffer);
    }
    about[lang].imgText2 = req.body.imgText2;
    if (req.files.img3?.length > 0) {
      // const filePath =
      //   req.files.img3[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img3[0].filename;
      // about[lang].img3 = filePath;
      const fileUpload = req.bucket.file(req.files.img3[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      about[
        lang
      ].img3 = `https://storage.googleapis.com/bucketsimage/${req.files.img3[0].originalname}`;
      blobStream.end(req.files.img3[0].buffer);
    }
    about[lang].imgText3 = req.body.imgText3;
    if (req.files.img4?.length > 0) {
      // const filePath =
      //   req.files.img4[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img4[0].filename;
      // about[lang].img4 = filePath;
      const fileUpload = req.bucket.file(req.files.img4[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      about[
        lang
      ].img4 = `https://storage.googleapis.com/bucketsimage/${req.files.img4[0].originalname}`;
      blobStream.end(req.files.img4[0].buffer);
    }
    about[lang].imgText4 = req.body.imgText4;
    about.save().then(() => {
      res.redirect("/admin/about?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/about?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err)
    }
    res.redirect("/admin/about?action=error");
  })
});

Router.get("/services", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Services.findOne({}, { [lang]: 1 }).then(async (services) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminServices", {
      services: services[lang],
      header: header[lang],
      blogs,
      sidebar: sidebar[lang],
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/services", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  Services.findOne({}, { [lang]: 1 }).then(async (services) => {
    services[lang].pageTitle = req.body.pageTitle;

    services[lang].title = req.body.title;

    services[lang].head.pText1 = req.body.pText1;

    services[lang].head.pText2 = req.body.pText2;

    services[lang].head.pText3 = req.body.pText3;


    if (req.files.img1?.length > 0) {
      // const filePath =
      //   req.files.img1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img1[0].filename;
      // services[lang].content.img1 = filePath;
      const fileUpload = req.bucket.file(req.files.img1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      services[
        lang
      ].content.img1 = `https://storage.googleapis.com/bucketsimage/${req.files.img1[0].originalname}`;
      blobStream.end(req.files.img1[0].buffer);
    }
    services[lang].content.h2Text1 = req.body.h2Text1;

    services[lang].content.liText1 = req.body.liText1;

    services[lang].content.contentPText1 = req.body.contentPText1;

    if (req.files.img2?.length > 0) {
      // const filePath =
      //   req.files.img2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img2[0].filename;
      // services[lang].content.img2 = filePath;
      const fileUpload = req.bucket.file(req.files.img2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      services[
        lang
      ].content.img2 = `https://storage.googleapis.com/bucketsimage/${req.files.img2[0].originalname}`;
      blobStream.end(req.files.img2[0].buffer);
    }
    services[lang].content.h2Text2 = req.body.h2Text2;

    services[lang].content.liText2 = req.body.liText2;

    services[lang].content.contentPText2 = req.body.contentPText2;

    if (req.files.img3?.length > 0) {
      // const filePath =
      //   req.files.img3[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img3[0].filename;
      // services[lang].content.img3 = filePath;
      const fileUpload = req.bucket.file(req.files.img3[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      services[
        lang
      ].content.img3 = `https://storage.googleapis.com/bucketsimage/${req.files.img3[0].originalname}`;
      blobStream.end(req.files.img3[0].buffer);
    }
    services[lang].content.h2Text3 = req.body.h2Text3;

    services[lang].content.liText3 = req.body.liText3;

    services[lang].content.contentPText3 = req.body.contentPText3;

    if (req.files.img4?.length > 0) {
      // const filePath =
      //   req.files.img4[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img4[0].filename;
      // services[lang].content.img4 = filePath;
      const fileUpload = req.bucket.file(req.files.img4[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      services[
        lang
      ].content.img4 = `https://storage.googleapis.com/bucketsimage/${req.files.img4[0].originalname}`;
      blobStream.end(req.files.img4[0].buffer);
    }
    services[lang].content.h2Text4 = req.body.h2Text4;

    services[lang].content.liText4 = req.body.liText4;

    services[lang].content.contentPText4 = req.body.contentPText4;

    if (req.files.backendImg?.length > 0) {
      // const filePath =
      //   req.files.backendImg[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.backendImg[0].filename;
      // services[lang].bottom.backendImg = filePath;
      const fileUpload = req.bucket.file(req.files.backendImg[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      services[
        lang
      ].bottom.backendImg = `https://storage.googleapis.com/bucketsimage/${req.files.backendImg[0].originalname}`;
      blobStream.end(req.files.backendImg[0].buffer);
    }
    if (req.files.icon1?.length > 0) {
      // const filePath =
      //   req.files.icon1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.icon1[0].filename;
      // services[lang].bottom.icon1 = filePath;
      const fileUpload = req.bucket.file(req.files.icon1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      services[
        lang
      ].bottom.icon1 = `https://storage.googleapis.com/bucketsimage/${req.files.icon1[0].originalname}`;
      blobStream.end(req.files.icon1[0].buffer);
    }
    if (req.files.icon2?.length > 0) {
      // const filePath =
      //   req.files.icon2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.icon2[0].filename;
      // services[lang].bottom.icon2 = filePath;
      const fileUpload = req.bucket.file(req.files.icon2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      services[
        lang
      ].bottom.icon2 = `https://storage.googleapis.com/bucketsimage/${req.files.icon2[0].originalname}`;
      blobStream.end(req.files.icon2[0].buffer);
    }
    if (req.files.icon3?.length > 0) {
      // const filePath =
      //   req.files.icon3[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.icon3[0].filename;
      // services[lang].bottom.icon3 = filePath;
      const fileUpload = req.bucket.file(req.files.icon3[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      services[
        lang
      ].bottom.icon3 = `https://storage.googleapis.com/bucketsimage/${req.files.icon3[0].originalname}`;
      blobStream.end(req.files.icon3[0].buffer);
    }

    services[lang].bottom.iconText1 = req.body.iconText1;

    services[lang].bottom.iconText2 = req.body.iconText2;

    services[lang].bottom.iconText3 = req.body.iconText3;

    services.save().then(() => {
      res.redirect("/admin/services?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/services?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/services?action=error");
  })
});

Router.get("/carrier", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Carrier.findOne({}, { [lang]: 1 }).then(async (carrier) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminCarrier", {
      carrier: carrier[lang],
      header: header[lang],
      blogs,
      sidebar: sidebar[lang],
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/carrier", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  Carrier.findOne({}, { [lang]: 1 }).then(async (carrier) => {
    carrier[lang].pageTitle = req.body.pageTitle;

    carrier[lang].titleH2Text = req.body.titleH2Text;

    carrier[lang].titlePText = req.body.titlePText;

    carrier[lang].inputText1 = req.body.inputText1;

    carrier[lang].inputText2 = req.body.inputText2;

    carrier[lang].inputText3 = req.body.inputText3;

    carrier[lang].inputText4 = req.body.inputText4;

    carrier[lang].buttonText = req.body.buttonText;

    carrier.save().then(() => {
      res.redirect("/admin/carrier?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/carrier?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/carrier?action=error");
  })
});

Router.get("/contact", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Contact.findOne({}, { [lang]: 1 }).then(async (contact) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminContact", {
      contact: contact[lang],
      header: header[lang],
      blogs,
      sidebar: sidebar[lang],
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/contact", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  Contact.findOne({}, { [lang]: 1 }).then((contact) => {
    contact[lang].pageTitle = req.body.pageTitle;

    contact[lang].titleH2Text = req.body.titleH2Text;

    contact[lang].pText1 = req.body.pText1;

    contact[lang].pText2 = req.body.pText2;
    if (req.files.icon1?.length > 0) {
      // const filePath =
      //   req.files.icon1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.icon1[0].filename;
      // contact[lang].icon1 = filePath;
      const fileUpload = req.bucket.file(req.files.icon1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      contact[
        lang
      ].icon1 = `https://storage.googleapis.com/bucketsimage/${req.files.icon1[0].originalname}`;
      blobStream.end(req.files.icon1[0].buffer);
    }
    contact[lang].iconTitleText1 = req.body.iconTitleText1;

    contact[lang].iconPText1 = req.body.iconPText1;

    if (req.files.icon2?.length > 0) {
      // const filePath =
      //   req.files.icon2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.icon2[0].filename;
      // contact[lang].icon2 = filePath;
      const fileUpload = req.bucket.file(req.files.icon2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      contact[
        lang
      ].icon2 = `https://storage.googleapis.com/bucketsimage/${req.files.icon2[0].originalname}`;
      blobStream.end(req.files.icon2[0].buffer);
    }
    contact[lang].iconTitleText2 = req.body.iconTitleText2;

    contact[lang].iconPText2 = req.body.iconPText2;

    if (req.files.icon3?.length > 0) {
      // const filePath =
      //   req.files.icon3[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.icon3[0].filename;
      // contact[lang].icon3 = filePath;
      const fileUpload = req.bucket.file(req.files.icon3[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      contact[
        lang
      ].icon3 = `https://storage.googleapis.com/bucketsimage/${req.files.icon3[0].originalname}`;
      blobStream.end(req.files.icon3[0].buffer);
    }
    contact[lang].iconTitleText3 = req.body.iconTitleText3;

    contact[lang].iconPText3 = req.body.iconPText3;

    contact[lang].iconPText4 = req.body.iconPText4;

    contact[lang].inputText1 = req.body.inputText1;

    contact[lang].inputText2 = req.body.inputText2;

    contact[lang].inputText3 = req.body.inputText3;

    contact[lang].inputText4 = req.body.inputText4;

    contact[lang].buttonText = req.body.buttonText;

    contact.save().then(() => {
      res.redirect("/admin/contact?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/contact?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/contact?action=error");
  })
});

Router.get("/sidebar", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  detailSidebar.findOne({}, { [lang]: 1 }).then(async (sidebar) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminSidebar", {
      sidebar: sidebar[lang],
      header: header[lang],
      blogs,
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/sidebar", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  detailSidebar.findOne({}, { [lang]: 1 }).then(async (sidebar) => {
    sidebar[lang].barTitleText = req.body.barTitleText;
    sidebar[lang].barText1 = req.body.barText1;
    sidebar[lang].barText2 = req.body.barText2;
    sidebar[lang].barText3 = req.body.barText3;
    sidebar.save().then(() => {
      res.redirect("/admin/sidebar?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/sidebar?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/sidebar?action=error");
  })
});

Router.get("/compliance", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Compliance.findOne({}, { [lang]: 1 }).then(async (compliance) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminCompliance", {
      compliance: compliance[lang],
      header: header[lang],
      blogs,
      sidebar: sidebar[lang],
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/compliance", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  Compliance.findOne({}, { [lang]: 1 }).then(async (compliance) => {
    compliance[lang].pageTitle = req.body.pageTitle;
    if (req.files.titleImg?.length > 0) {
      // const filePath =
      //   req.files.titleImg[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.titleImg[0].filename;
      // compliance[lang].titleImg = filePath;
      const fileUpload = req.bucket.file(req.files.titleImg[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      compliance[
        lang
      ].titleImg = `https://storage.googleapis.com/bucketsimage/${req.files.titleImg[0].originalname}`;
      blobStream.end(req.files.titleImg[0].buffer);
    }
    compliance[lang].titleH1Text1 = req.body.titleH1Text1;
    compliance[lang].pText1 = req.body.pText1;
    if (req.files.img1?.length > 0) {
      // const filePath =
      //   req.files.img1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img1[0].filename;
      // compliance[lang].img1 = filePath;
      const fileUpload = req.bucket.file(req.files.img1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      compliance[
        lang
      ].img1 = `https://storage.googleapis.com/bucketsimage/${req.files.img1[0].originalname}`;
      blobStream.end(req.files.img1[0].buffer);
    }
    compliance[lang].liText1 = req.body.liText1;
    compliance[lang].liText2 = req.body.liText2;
    compliance[lang].liText3 = req.body.liText3;
    compliance[lang].liText4 = req.body.liText4;
    compliance[lang].pText2 = req.body.pText2;
    compliance[lang].quoteText1 = req.body.quoteText1;
    compliance[lang].titleH1Text2 = req.body.titleH1Text2;
    compliance[lang].pText3 = req.body.pText3;
    if (req.files.img2?.length > 0) {
      // const filePath =
      //   req.files.img2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img2[0].filename;
      // compliance[lang].img2 = filePath;
      const fileUpload = req.bucket.file(req.files.img2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      compliance[
        lang
      ].img2 = `https://storage.googleapis.com/bucketsimage/${req.files.img2[0].originalname}`;
      blobStream.end(req.files.img2[0].buffer);
    }
    if (req.files.Icon1?.length > 0) {
      // const filePath =
      //   req.files.Icon1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.Icon1[0].filename;
      // compliance[lang].Icon1 = filePath;
      const fileUpload = req.bucket.file(req.files.Icon1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      compliance[
        lang
      ].Icon1 = `https://storage.googleapis.com/bucketsimage/${req.files.Icon1[0].originalname}`;
      blobStream.end(req.files.Icon1[0].buffer);
    }
    compliance[lang].IconTitleText1 = req.body.IconTitleText1;
    compliance[lang].IconPText1 = req.body.IconPText1;
    if (req.files.Icon2?.length > 0) {
      // const filePath =
      //   req.files.Icon2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.Icon2[0].filename;
      // compliance[lang].Icon2 = filePath;
      const fileUpload = req.bucket.file(req.files.Icon2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      compliance[
        lang
      ].Icon2 = `https://storage.googleapis.com/bucketsimage/${req.files.Icon2[0].originalname}`;
      blobStream.end(req.files.Icon2[0].buffer);
    }
    compliance[lang].IconTitleText2 = req.body.IconTitleText2;
    compliance[lang].IconPText2 = req.body.IconPText2;
    compliance[lang].titleH1Text3 = req.body.titleH1Text3;
    compliance[lang].pText4 = req.body.pText4;
    compliance[lang].panelTitleText1 = req.body.panelTitleText1;
    compliance[lang].panelPText1 = req.body.panelPText1;
    compliance[lang].panelTitleText2 = req.body.panelTitleText2;
    compliance[lang].panelPText2 = req.body.panelPText2;
    compliance[lang].panelTitleText3 = req.body.panelTitleText3;
    compliance[lang].panelPText3 = req.body.panelPText3;
    compliance[lang].titleH1Text4 = req.body.titleH1Text4;
    compliance[lang].pText5 = req.body.pText5;
    compliance[lang].liText5 = req.body.liText5;
    compliance[lang].liText6 = req.body.liText6;
    compliance[lang].liText7 = req.body.liText7;
    compliance[lang].liText8 = req.body.liText8;
    compliance.save().then(() => {
      res.redirect("/admin/compliance?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/compliance?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err)
    }
    res.redirect("/admin/compliance?action=error");
  })
});

Router.get("/conseil", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Conseil.findOne({}, { [lang]: 1 }).then(async (conseil) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminConseil", {
      conseil: conseil[lang],
      header: header[lang],
      sidebar: sidebar[lang],
      blogs,
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/conseil", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  Conseil.findOne({}, { [lang]: 1 }).then((conseil) => {
    conseil[lang].pageTitle = req.body.pageTitle;
    if (req.files.titleImg?.length > 0) {
      const filePath =
        req.files.titleImg[0].destination.replace("/public", "") +
        "/" +
        req.files.titleImg[0].filename;
      conseil[lang].titleImg = filePath;
    }
    conseil[lang].titleH1Text1 = req.body.titleH1Text1;
    conseil[lang].pText1 = req.body.pText1;
    conseil[lang].pText2 = req.body.pText2;
    conseil[lang].liText1 = req.body.liText1;
    conseil[lang].liText2 = req.body.liText2;
    conseil[lang].liText3 = req.body.liText3;
    conseil[lang].pText3 = req.body.pText3;
    conseil[lang].liText4 = req.body.liText4;
    conseil[lang].liText5 = req.body.liText5;
    conseil[lang].liText6 = req.body.liText6;
    conseil[lang].liText7 = req.body.liText7;
    conseil[lang].liText8 = req.body.liText8;
    conseil[lang].pText4 = req.body.pText4;
    if (req.files.img1?.length > 0) {
      // const filePath =
      //   req.files.img1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img1[0].filename;
      // conseil[lang].img1 = filePath;
      const fileUpload = req.bucket.file(req.files.img1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      conseil[
        lang
      ].img1 = `https://storage.googleapis.com/bucketsimage/${req.files.img1[0].originalname}`;
      blobStream.end(req.files.img1[0].buffer);
    }
    conseil[lang].liText9 = req.body.liText9;
    conseil[lang].liText10 = req.body.liText10;
    conseil[lang].liText11 = req.body.liText11;
    conseil[lang].liText12 = req.body.liText12;
    conseil[lang].pText5 = req.body.pText5;
    conseil[lang].quoteText1 = req.body.quoteText1;
    conseil[lang].titleH1Text2 = req.body.titleH1Text2;
    conseil[lang].pText6 = req.body.pText6;
    if (req.files.img2?.length > 0) {
      // const filePath =
      //   req.files.img2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.img2[0].filename;
      // conseil[lang].img2 = filePath;
      const fileUpload = req.bucket.file(req.files.img2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      conseil[
        lang
      ].img2 = `https://storage.googleapis.com/bucketsimage/${req.files.img2[0].originalname}`;
      blobStream.end(req.files.img2[0].buffer);
    }
    if (req.files.Icon1?.length > 0) {
      // const filePath =
      //   req.files.Icon1[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.Icon1[0].filename;
      // conseil[lang].Icon1 = filePath;
      const fileUpload = req.bucket.file(req.files.Icon1[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      conseil[
        lang
      ].Icon1 = `https://storage.googleapis.com/bucketsimage/${req.files.Icon1[0].originalname}`;
      blobStream.end(req.files.Icon1[0].buffer);
    }
    conseil[lang].IconTitleText1 = req.body.IconTitleText1;
    conseil[lang].IconPText1 = req.body.IconPText1;
    if (req.files.Icon2?.length > 0) {
      // const filePath =
      //   req.files.Icon2[0].destination.replace("/public", "") +
      //   "/" +
      //   req.files.Icon2[0].filename;
      // conseil[lang].Icon2 = filePath;
      const fileUpload = req.bucket.file(req.files.Icon2[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      conseil[
        lang
      ].Icon2 = `https://storage.googleapis.com/bucketsimage/${req.files.Icon2[0].originalname}`;
      blobStream.end(req.files.Icon2[0].buffer);
    }
    conseil[lang].IconTitleText2 = req.body.IconTitleText2;
    conseil[lang].IconPText2 = req.body.IconPText2;
    conseil[lang].titleH1Text3 = req.body.titleH1Text3;
    conseil[lang].pText7 = req.body.pText7;
    conseil[lang].panelTitleText1 = req.body.panelTitleText1;
    conseil[lang].panelPText1 = req.body.panelPText1;
    conseil[lang].panelTitleText2 = req.body.panelTitleText2;
    conseil[lang].panelPText2 = req.body.panelPText2;
    conseil[lang].panelTitleText3 = req.body.panelTitleText3;
    conseil[lang].panelPText3 = req.body.panelPText3;
    conseil[lang].titleH1Text4 = req.body.titleH1Text4;
    conseil[lang].pText8 = req.body.pText8;
    conseil[lang].liText13 = req.body.liText13;
    conseil[lang].liText14 = req.body.liText14;
    conseil[lang].liText15 = req.body.liText15;
    conseil[lang].liText16 = req.body.liText16;
    conseil.save().then(() => {
      res.redirect("/admin/conseil?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/conseil?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/conseil?action=error");
  })
});

Router.get("/hammersmith", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Hammersmith.findOne({}, { [lang]: 1 }).then(async (hammersmith) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    res.render("adminHammersmith", {
      hammersmith: hammersmith[lang],
      header: header[lang],
      sidebar: sidebar[lang],
      blogs,
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.get("/footer", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Footer.findOne({}, { [lang]: 1 }).then(async (footer) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    res.render("adminFooter", {
      footer: footer[lang],
      sidebar: sidebar[lang],
      blogs,
      header: header[lang],
      user: req.session.user,
      action: req.query.action,
    });
  });
});

Router.post("/footer", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie;
  Footer.findOne({}, { [lang]: 1 }).then((footer) => {
    footer[lang].aText = req.body.aText;
    footer[lang].pText = req.body.pText;
    footer[lang].icon1 = req.body.icon1;
    footer[lang].icon2 = req.body.icon2;
    footer[lang].tel = req.body.tel;
    footer[lang].email = req.body.email;
    footer[lang].navTitle = req.body.navTitle;
    footer[lang].navbar.homeNav = req.body.homeNav;
    footer[lang].navbar.aboutNav = req.body.aboutNav;
    footer[lang].navbar.servicesNav = req.body.servicesNav;
    footer[lang].navbar.blogNav = req.body.blogNav;
    footer[lang].navbar.carrierNav = req.body.carrierNav;
    footer[lang].navbar.contactNav = req.body.contactNav;
    footer[lang].recentTitle = req.body.recentTitle;
    footer[lang].bottomPText = req.body.bottomPText;
    footer[lang].bottomAText = req.body.bottomAText;
    footer[lang].facebookHref = req.body.facebookHref;
    footer[lang].facebookIcon = req.body.facebookIcon;
    footer[lang].twitterHref = req.body.twitterHref;
    footer[lang].twitterIcon = req.body.twitterIcon;
    footer[lang].instagramHref = req.body.instagramHref;
    footer[lang].instagramIcon = req.body.instagramIcon;
    footer[lang].linkedlinHref = req.body.linkedlinHref;
    footer[lang].linkedlinIcon = req.body.linkedlinIcon;
    footer[lang].telText = req.body.telText;
    footer[lang].emailText = req.body.emailText;
    footer[lang].telOutText = req.body.telOutText;
    footer[lang].emailOutText = req.body.emailOutText;
    footer.save().then(() => {
      res.redirect("/admin/footer?action=success");
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/footer?action=error");
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/footer?action=error");
  })
});

Router.get("/blog", isAuthenticated, Auth, async (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  const header = await Header.findOne({}, { [lang]: 1 });
  const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
  const blogs = await Blog.find({ lang: lang });
  res.render("adminBlog", {
    header: header[lang],
    sidebar: sidebar[lang],
    blogs,
    user: req.session.user,
    action: req.query.action,
  });
});

Router.post("/blog", isAuthenticated, Auth, async (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  try {
    const recentPost = await RecentPost.findOne(
        {},
        { [`recentPost.${lang}`]: 1 }
      );
      let _titleImg;
      if (req.files.titleImg?.length > 0) {
        // const filePath =
        //   req.files.titleImg[0].destination.replace("./public", "") +
        //   "/" +
        //   req.files.titleImg[0].filename;
        // _titleImg = filePath;
        const fileUpload = req.bucket.file(req.files.titleImg[0].originalname);
        const blobStream = fileUpload.createWriteStream();
        blobStream.on("error", (err) => {
          console.error(err);
          res.status(500).send("Error uploading file to Google Cloud Storage");
        });
        blobStream.on("finish", () => {
          // Yükleme başarılı olduysa buraya gelecek
          console.log("success");
        });
        _titleImg = `https://storage.googleapis.com/bucketsimage/${req.files.titleImg[0].originalname}`;
        blobStream.end(req.files.titleImg[0].buffer);
      }
      const blog = new Blog({
        pageTitle: req.body.pageTitle,
        titleImg: _titleImg,
        titleH1Text1: req.body.titleH1Text1,
        dateIcon: req.body.dateIcon ? req.body.dateIcon : "fa-clock icn",
        createdDate: req.body.createdDate
          ? req.body.createdDate
          : new Date(Date.now()),
        userIcon: req.body.userIcon ? req.body.userIcon : "fa-user icn",
        user: req.body.user ? req.body.user : "HammerSmith",
        content: req.body.editordata,
        lang: lang,
      });
    
      recentPost.recentPost[lang] = {
        title: req.body.titleH1Text1,
        img1: _titleImg,
        blogId: blog._id,
      };
      await recentPost.save();
      blog.save().then(() => {
        res.redirect("/admin/blog?action=success");
      }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect("/admin/blog?action=error");
      })
  } catch (error) {
    if(error){
        console.log(error);
    }
    res.redirect("/admin/blog?action=error");
  }
});

Router.get("/blog/remove/:blogId", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Blog.findByIdAndDelete(req.params.blogId).then(async () => {
    const recent = await RecentPost.findOne({
      [`recentPost.${lang}.blogId`]: req.params.blogId,
    });
    if (recent) {
      const lastBlog = await Blog.findOne({ lang: lang }).sort({ _id: -1 });
      if (lastBlog) {
        recent.recentPost[lang].blogId = lastBlog._id;
        recent.recentPost[lang].img1 = lastBlog.titleImg;
        recent.recentPost[lang].title = lastBlog.titleH1Text1;
        await recent.save();
      } else {
        recent.recentPost[lang].blogId = null;
        recent.recentPost[lang].img1 = null;
        recent.recentPost[lang].title = null;
        await recent.save();
      }
      res.redirect("/admin/blog");
    } else {
      res.redirect("/admin/blog");
    }
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/blog?action=error");
  })
});

Router.get("/blog/update/:blogId", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Blog.findOne({ _id: req.params.blogId }).then(async (blog) => {
    const header = await Header.findOne({}, { [lang]: 1 });
    const sidebar = await detailSidebar.findOne({}, { [lang]: 1 });
    const blogs = await Blog.find({ lang: lang });
    res.render("adminBlogUpdate", {
      blog,
      header: header[lang],
      sidebar: sidebar[lang],
      blogs,
      user: req.session.user,
      action: req.query.action,
    });
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/blog?action=error")
  })
});

Router.post("/blog/update/:blogId", isAuthenticated, Auth, (req, res) => {
  const lang = req.cookies.langCookie || "fr";
  Blog.findOne({ _id: req.params.blogId }).then((blog) => {
    blog.pageTitle = req.body.pageTitle;
    if (req.files.titleImg?.length > 0) {
      // const filePath =
      //   req.files.titleImg[0].destination.replace("./public", "") +
      //   "/" +
      //   req.files.titleImg[0].filename;
      // _titleImg = filePath;
      const fileUpload = req.bucket.file(req.files.titleImg[0].originalname);
      const blobStream = fileUpload.createWriteStream();
      blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Error uploading file to Google Cloud Storage");
      });
      blobStream.on("finish", () => {
        // Yükleme başarılı olduysa buraya gelecek
        console.log("success");
      });
      blog.titleImg = `https://storage.googleapis.com/bucketsimage/${req.files.titleImg[0].originalname}`;
      blobStream.end(req.files.titleImg[0].buffer);
    }
    blog.titleH1Text1 = req.body.titleH1Text1;
    blog.dateIcon = req.body.dateIcon;
    blog.createdDate = req.body.createdDate;
    blog.userIcon = req.body.userIcon;
    blog.user = req.body.user;
    blog.content = req.body.editordata;
    blog.save().then(async() => {
        const recent = await RecentPost.findOne({
            [`recentPost.${lang}.blogId`]: req.params.blogId,
          });
          if (recent) {
            recent.recentPost[lang].blogId = blog._id;
            recent.recentPost[lang].img1 = blog.titleImg;
            recent.recentPost[lang].title = blog.titleH1Text1;
            try {
                await recent.save();
            } catch (error) {
                if(error){
                    console.log(error);
                }
                res.redirect(`/admin/blog/update/${blog._id}?action=error`)
            }
          }
          res.redirect(`/admin/blog/update/${blog._id}?action=success`);
    }).catch((err)=>{
        if(err){
            console.log(err);
        }
        res.redirect(`/admin/blog/update/${blog._id}?action=error`);
    })
  }).catch((err)=>{
    if(err){
        console.log(err);
    }
    res.redirect("/admin/blog?action=error");
  })
});

Router.get("/login", Auth, (req, res) => {
  let errorMessage = req.session.errorMessage;
  delete req.session.errorMessage;
  res.render("login", {
    errorMessage,
  });
});

Router.post("/login", Auth, (req, res) => {
  const loginModel = new Login({
    email: req.body.email,
    password: req.body.password,
  });
  loginModel.validate().then(() => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        req.session.errorMessage =
          "There is no record found with this email address.";
        req.session.save(() => res.redirect("/admin/login"));
      } else {
        if (user.password === req.body.password) {
          req.session.user = user;
          req.session.isAuthenticated = true;
          return req.session.save(() => {
            return res.redirect("/admin/header");
          });
        } else {
          req.session.errorMessage =
            "You entered an incorrect email or password.";
          req.session.save(() => res.redirect("/admin/login"));
        }
      }
    });
  });
});

Router.get("/logout", isAuthenticated, Auth, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = Router;
