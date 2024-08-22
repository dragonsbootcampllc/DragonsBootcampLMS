const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

// File size limit (e.g., 50 MB)
const fileSizeLimit = 50 * 1024 * 1024; // 50 MB in bytes


const fileFilter = (req, file, cb) => {

  console.log('File MIME type:', file.mimetype);
  console.log('File extension:', path.extname(file.originalname).toLowerCase());

  const allowedFileTypes = /jpeg|jpg|png|mp4|avi|mov|mkv|pdf|doc|docx/;
  const allowedTimeTypes = [
    'image/jpeg', // jpeg
    'image/png', // png
    'video/mp4', // mp4
    'video/avi', // avi
    'video/x-msvideo', // avi
    'video/quicktime', // mov
    'video/x-matroska', // mkv
    'application/pdf', // pdf
    'application/msword', // doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  ];
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTimeTypes.includes(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, videos, and documents are allowed.'));
  }
};


const upload = multer({
  storage: storage,
  limits: { fileSize: fileSizeLimit },
  fileFilter: fileFilter,
});

module.exports = upload;
