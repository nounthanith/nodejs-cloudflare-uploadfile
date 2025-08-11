const { Router } = require("express");
const { uploadFile,deleteFile  } = require("./upload.controller");
const multer = require("multer");
const router = Router()

const upload = multer({
  storage: multer.memoryStorage()
})
router.post("/upload",upload.single("image"), uploadFile)
router.delete("/upload/:key", deleteFile)
module.exports = router