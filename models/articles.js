const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  title: String,
  intro: String,
  email: String,
  publicationDate: Date,
});

module.exports = mongoose.model('Articles', ArticlesSchema);
