const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const data = require("../data/videos.json");

router.get("/", (req, res) => {
  const videoListSend = getVideos();
  const video = videoListSend.map(({ id, title, image, channel }) => ({
    id,
    title,
    channel,
    image,
  }));
  res.send(video);
});

router.get("/:vidId", (req, res, next) => {
  const videoId = req.params.vidId;
  const videoDetails = getVideos();
  const video = videoDetails.find((vid) => {
    return vid.id === videoId;
  });
  res.send(video);
});

router.post("/", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      error: true,
      message: "You must provide a title, and description",
    });
  }

  const newVideo = {
    id: uuidv4(),
    title: title,
    channel: "Kimmy",
    image: 'http://localhost:8000/upload-preview.jpg',
    description: description,
    views: "31,001,023",
    likes: "2110,985",
    duration: "4:01",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: new Date(),
    comments: [
      {
        id: uuidv4(),
        name: "Elliot",
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likes: 0,
        timestamp: 1628522461080,
      },
      {
        id: uuidv4(),
        name: "Henry",
        comment:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        likes: 0,
        timestamp: 1626359541040,
      },
    ],
  };

  data.push(newVideo);

  fs.writeFile("./data/videos.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "There was an error saving the post, please try again",
      });
    }

    res.status(201).json(newVideo);
  });
});

function getVideos() {
  const videosFromFile = fs.readFileSync("./data/videos.json");
  return JSON.parse(videosFromFile);
}

module.exports = router;
