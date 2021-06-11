const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");

const app = express();

app.use(cors());

const tempDir = path.join(__dirname, "temp");
const uploadDir = path.join(__dirname, "upload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1000000,
  },
});

const upload = multer({
  storage,
});

app.post("/profile", upload.single("avatar"), async (req, res, next) => {
  const { path: tempName, originalname } = req.file;
  const now = new Date();
  const filePart = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}-${now.getHours()}`;
  const [file, extention] = originalname.split(".");
  const newFileName = `${file}_${filePart}.${extention}`;
  const fileName = path.join(uploadDir, newFileName);
  console.log(req.file);
  console.log(tempName);
  console.log(fileName);
  try {
    await fs.rename(tempName, fileName);
    /*
      {
          name: "",
          email: "",
          avatar: fileName
      }
      */
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        file: fileName,
      },
    });
  } catch (error) {
    next(error);
  }
});

const orderFiles = upload.fields[{
    name: "mainImg", maxCount: 1
},{
    name: "otherImg", maxCount: 10
}]

app.post("/order", orderFiles, ()=>{

})

app.listen(3000);
