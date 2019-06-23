const multer = require('multer');
const path = require('path');

module.exports = {
  // __dirname = current directory of uploads.js,
  // then once '..' you will fall on /src, and
  // one more '..' you will fall on backend
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    // cb = callback
    filename: function(req, file, cb) {
      // first argument is how to handle error, in this case, null, because there is no possible error
      cb(null, file.originalname);
    }
  })
};
