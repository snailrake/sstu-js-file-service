const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const fileController = require('./controller');

const uploadDirectory = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.post('/upload', upload.single('file'), fileController.uploadImage);
router.get('/:filename', fileController.getImage);
router.delete('/:filename', fileController.deleteImage);

module.exports = router;
