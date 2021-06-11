const fs = require("fs").promises;
const path = require("path");

const imgTempPath = path.join(__dirname, "temp", "cat.jpg");
const imgUploadPath = path.join(__dirname, "files", "dog.jpg");
fs.rename(imgTempPath, imgUploadPath);
