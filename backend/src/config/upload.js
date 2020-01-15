const multer = require ('multer');
const path = require ('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, `..`, `..`, 'uploads'), // usar claves e nao aspas seu burro
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
     
    })
};