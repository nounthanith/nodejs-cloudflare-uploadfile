const { Router } = require("express");
const { uploadFile,deleteFile  } = require("./upload.controller");
const multer = require("multer");
const { protected } = require("../shared/protected");
const { authorize } = require("../shared/authorize");
const { role } = require("../utils/role");
const router = Router()

const upload = multer({
  storage: multer.memoryStorage()
})
router.post("/upload",protected,authorize([role.ADMIN]), upload.single("image"), uploadFile)
router.delete("/upload/:key",protected,authorize([role.ADMIN]), deleteFile)
module.exports = router