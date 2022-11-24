const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const upload = multer({ dest: "./Images" });

// const imageUrl = (req, res, next) => {
//   try {
//     const imageUrl = "http://localhost:8080/" + req.file.path;
//     req.body.imageUrl = imageUrl;
//     next();
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// const imageUrl = (req, res, next) => {
//   console.log("req.file", req.file);
//   try {
//     console.log("after multer");
//     if (req.file) {
//       const imageUrl = "http://localhost:8080/" + req.file.path;
//       req.body.imageUrl = imageUrl;
//       console.log("succeeded imageUrl");
//       next();
//     }
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

cloudinary.config({
  cloud_name: "myimagescloud",
  api_key: "957554899686291",
  api_secret: "revZxBl37Jz8IrVLh9zW1PHKD7s",
});

const uploadToCloudinary = async (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No image attached');
    return;
  } else {
    cloudinary.uploader.upload(req.file.path, (error, result) => {
     if (error) {
      res.status(err).send(err.message);
      return;
     }
     if (result) {
      // console.log(result);
      req.body.imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
      next();
     }
    });
  }};



module.exports = { upload, uploadToCloudinary };