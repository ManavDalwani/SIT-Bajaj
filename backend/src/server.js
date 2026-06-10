const express = require("express");
const cors = require("cors");
const graphRoutes = require("./routes/graph");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/graph", graphRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
