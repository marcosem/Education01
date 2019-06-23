const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

// (req, res) => {} is a middleware function
/*routes.get('/', (req, res) => {
  //return res.send('Hello World');
  return res.send(`Olá ${req.query.name}`);
});*/

// upload.single = um unico arquivo sendo recebido
// 'image' nome do campo da image

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
