const mongoose = require("mongoose");

const url = "localhost:27017";
const dbName = "frontcamp";

mongoose.connect(`mongodb://${url}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("We are connected");
});

const newsSchema = new mongoose.Schema({
  source: {
    id: Number,
    name: String
  },
  author: String,
  title: String,
  description: String,
  urlToImage: String,
  publishedAt: Date,
  content: String
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
