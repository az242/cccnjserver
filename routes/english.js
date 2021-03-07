const express = require('express');
// const bodyParser = require('body-parser');
const router = express.Router();
// const jsonParser = bodyParser.json();

router.get('')

router.get("/testpath", (req, res) => {
    res.json({
        message: "Welcome to bezkoder application."
    });
});

module.exports = router;