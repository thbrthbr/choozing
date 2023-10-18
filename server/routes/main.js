const express = require('express');
const router = express.Router();

const Controller = require('../controller/Cmain');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  //저장될 경로지정
  destination: (req, file, cb) => {
    cb(null, '../../utilgame/client/public/');
  },
  //파일 이름 설정
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const newName = path.basename(file.originalname, ext) + Date.now() + ext;
    cb(null, newName);
  },
});
const limits = {
  fileSize: 5 * 1024 * 1024,
};
const upload = multer({ storage, limits });

router.post('/img_upload', upload.array('img-upload'), Controller.upload);
module.exports = router;
