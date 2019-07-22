const express = require('express')
    , multer = require('multer')
    , PostController = require('./controllers/PostController')
    , LikeController = require('./controllers/LikeController')
    , uploadsConfig = require('./config/upload');

const routes = new express.Router();
const upload = multer(uploadsConfig);

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;