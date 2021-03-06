const mongoose = require('mongoose');

const url = 'localhost:27017';
const dbName = 'frontcamp';
const uri = `mongodb://${url}/${dbName}`;
const mongoCloudUri = process.env.MONGODB_URL;

mongoose.connect(mongoCloudUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected');
});

const newsSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: String,
  description: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const mySourceSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  url: String,
  category: String,
  language: String,
  country: String,
});

const News = mongoose.model('News', newsSchema);
const User = mongoose.model('User', userSchema);
const Source = mongoose.model('Source', mySourceSchema, 'source');

mongoose.set('useCreateIndex', true);

module.exports = { News, User, Source };
