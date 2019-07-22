const Post = require('../models/Post')
    , sharp = require('sharp')
    , path = require('path')
    , fs = require('fs');

module.exports = {
  /**
   * Retorna todos os posts feitos no App em ordem decrescente por data de criação.
   */
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  /**
   * Recebe os dados do arquivo e outros dados restantes do post.
   */
  async store(req, res) {

    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split('.');
    const fileName = `${ name }.jpg`;

    // Redimensiona e trata a imagem postada.
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName)
      )

    // Deleta a imagem de tamanho original.
    fs.unlinkSync(req.file.path);

    // Salva o post dentro do BD.
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    // Envia a informação de que o Post foi realizado em tempo real para os outros usuários com a mensagem 'post'.
    req.io.emit('post', post);

    return res.json(post);
  }
};