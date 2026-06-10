const express = require("express");
const cors = require("cors");
const graphRoutes = require("./routes/graph");

const app = express();

app.use(
    cors({
        origin: "*"
    })
);

app.use(express.json());

app.use("/api/graph", graphRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});