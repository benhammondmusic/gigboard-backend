const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  User: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tip: {
    type: Boolean,
  },
  location: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  publishDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
  },
  workStartDate: {
    type: Date,
    required: true,
  },
  workEndDate: {
    type: Date,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
