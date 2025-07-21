const express = require('express');
const router = express.Router();
const multer = require('multer');
const { summarizeText, summarizeFile } = require('../controllers/summarizeController');


const upload = multer({ dest: 'uploads/' });


router.post('/text', summarizeText);
router.post('/file', upload.single('file'), summarizeFile);

module.exports = router;
