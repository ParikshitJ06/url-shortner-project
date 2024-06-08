const express = require('express');
const urlcontroller = require('../controller/urlcontroller');

const router = express.Router();

router.post("/", urlcontroller.handlegenerateNewShortUrl);
router.get('/analytics/:shortid', urlcontroller.handleGetAnalytics); // corrected to have a leading slash

module.exports = router;
