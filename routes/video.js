const express = require("express");
const router = express.Router();

const data = require("../data/videos.json");

router.get("/", (req, res, next) => {
  const videoList = data.map((video) => {
    res.send(video.id);
  });

  // const videoList = data.map((video) => {
  //   [
  //     {
  //       id: video.id,
  //       title: video.title,
  //       channel: video.channel,
  //       image: video.image,
  //     },
  //   ];
  // });
  // res.json(videoList);
});

// router.get('/:vidId',(req,res,next)=>{
//   const videoId = req.params.vidId
//   const video = data.find(vid =>{
//     return vid.id === videoId
//   })
//   res.send(video)
// })
module.exports = router;
