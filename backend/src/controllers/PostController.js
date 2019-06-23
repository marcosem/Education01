const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
  async index(req, res) {
    // - in front of sort is for decresent order
    const posts = await Post.find().sort('-createdAt');
    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const filename = `${name}.jpg`;

    // Resize the image and save it to uploads/resized
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', filename));

    // delete the old image (path uploads)
    fs.unlinkSync(req.file.path);

    // Add it to DB
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: filename
    });

    // Emit a message 'post' to all connected users
    req.io.emit('post', post);

    return res.json(post);
  }
};
