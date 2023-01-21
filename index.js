const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const videoRoutes = require("./routes/video");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("./public/images"));

app.use((req, res, next) => {
  if (
    req.method === "POST" &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res.status(400).json({
      error: true,
      message: "This API only accepts JSON data for a POST/PUT requset body",
    });
  }

  next();
});

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
