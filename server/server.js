const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "..", "dist");

app.use(express.static(publicPath));

app.get("/*path", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
    console.log("Server is up on port 3000");
    setInterval(() => {}, 1000000); // Keep event loop alive
});
