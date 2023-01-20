const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const videoRoutes = require('./routes/video')

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("./public/images"));

app.use('/videos', videoRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
