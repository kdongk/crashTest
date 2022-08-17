const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is up and running");
});

router.get("/register", (req, res) => {
  res.send("Post Request sended");
  console.log(req);
  console.log("get Post Request");
  console.log(res);
});

module.exports = router;
