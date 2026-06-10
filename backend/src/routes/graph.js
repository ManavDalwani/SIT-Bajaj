const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    res.json({
        message: "Graph API working"
    });
});

module.exports = router;