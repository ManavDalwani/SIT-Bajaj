const express = require("express");
const processGraph = require("../services/graphService");

const router = express.Router();

router.post("/", (req, res) => {

    const { edges } = req.body;

    const result = processGraph(edges);

    res.json(result);
});

module.exports = router;