/**
 * Configura o destino dos arquivos upados, para a pasta 'uploads', e trata o nome do arquivo pelo seu nome original.
 */
const multer = require('multer');
const path = require('path');

module.exports = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  })
};

