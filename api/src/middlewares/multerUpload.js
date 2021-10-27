const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const multerUpload = multer({
  limits: { fileSize: 500000 }, // 5 MB
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/uploads/");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid
      ? null
      : new Error("Esse formato de arquivo não é suportado!");
    cb(error, isValid);
  },
});

module.exports = multerUpload;
