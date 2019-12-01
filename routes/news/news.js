const express = require("express");
const newsRouter = express.Router();

const News = require("../../mongoose");

newsRouter.get("/", (req, res) => {
  News.find({}, (err, articles) => {
    res.send(articles);
  });
});

newsRouter.get("/:id", (req, res) => {
  News.findOne({ "source.id": req.params.id }, (err, article) => {
    res.send(article);
  });
});

newsRouter.post("/", (req, res) => {
  News.create(req.body, (err, createdArticle) => {
    if (err) return console.log("Error");
    res.send(createdArticle);
  });
});

newsRouter.put("/:id", (req, res) => {
  News.updateOne(
    { "source.id": req.params.id },
    req.body,
    (err, updatingInfo) => {
      if (err) return console.log(err);
      res.send(updatingInfo);
    }
  );
});

newsRouter.delete("/:id", (req, res) => {
  News.deleteOne({ "source.id": req.params.id }, (err, deletingInfo) => {
    if (err) return console.log(err);
    res.send(deletingInfo);
  });
});

module.exports = newsRouter;
