const express = require("express");
const app = express();
const Router = require("./router");
const adminRouter = require("./adminRouter");
const moongose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const { Storage } = require("@google-cloud/storage");

app.set("view engine", "ejs");
app.set("views", "./views");

const uri =
"mongodb+srv://burak:burak123@cluster0.fog3heb.mongodb.net/basicCMS?retryWrites=true&w=majority";

let store = new mongoDbStore({
  uri,
  collection: "mySessions",
});

app.use(
  session({
    secret: "hmrsmith",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store: store,
  })
);

const User = require("./models/User");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     const filePath = `./public/images/${file.originalname}`;
//     let _file;
//     let exists = fs.existsSync(filePath);
//     if (exists) {
//       _file =
//         path.basename(file.originalname, path.extname(file.originalname)) +
//         Date.now() +
//         path.extname(file.originalname);
//     } else {
//       _file = file.originalname;
//     }
//     cb(null, _file);
//   },
// });

const storage = multer.memoryStorage();

const storageBucket = "bucketsimage";
const storageClient = new Storage({
  projectId: "hosting-web-408508",
  keyFilename: "key.json",
});
const bucket = storageClient.bucket(storageBucket);

app.use((req, res, next) => {
  req.bucket = bucket;
  next();
});

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.use(
  multer({ storage: storage }).fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "slide1Img",
      maxCount: 1,
    },
    {
      name: "slide2Img",
      maxCount: 1,
    },
    {
      name: "slide3BackendImg",
      maxCount: 1,
    },
    {
      name: "slide3Img1",
    },
    {
      name: "slide3Img2",
      maxCount: 1,
    },
    {
      name: "slide3Img3",
      maxCount: 1,
    },
    {
      name: "slide3Img4",
      maxCount: 1,
    },
    {
      name: "contentImg1",
      maxCount: 1,
    },
    {
      name: "contentImg2",
      maxCount: 1,
    },
    {
      name: "contentImg3",
      maxCount: 1,
    },
    {
      name: "contentImg4",
      maxCount: 1,
    },
    {
      name: "titleImg",
      maxCount: 1,
    },
    {
      name: "img1",
      maxCount: 1,
    },
    {
      name: "img2",
      maxCount: 2,
    },
    {
      name: "img3",
      maxCount: 1,
    },
    {
      name: "img4",
      maxCount: 1,
    },
    {
      name: "backendImg",
      maxCount: 1,
    },
    {
      name: "icon1",
      maxCount: 1,
    },
    {
      name: "icon2",
      maxCount: 1,
    },
    {
      name: "icon3",
      maxCount: 1,
    },
    {
      name: "Icon1",
      maxCount: 1,
    },
    {
      name: "Icon2",
      maxCount: 1,
    },
    {
      name: "files",
    },
  ])
);

// app.use(multer({ storage: storage }).any());

const errorController = require("./notfound");

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(Router);
app.use("/admin", adminRouter);

app.use(errorController.get404Page);

moongose.connect(uri).then(() => {
  app.listen(8080, () => {
    console.log("Database bağlandı ve sunucu çalıştırıldı!");
  });
});
