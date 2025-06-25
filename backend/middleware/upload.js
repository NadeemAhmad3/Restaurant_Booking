const multer = require('multer');
const path = require('path');
const fs = require('fs');

// A function to create a configured multer instance
const createUploader = (subfolder) => {
  const uploadPath = path.join(__dirname, '..', 'uploads', subfolder);

  // Ensure the destination directory exists
  fs.mkdirSync(uploadPath, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Create a unique filename to prevent overwriting
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  };

  return multer({ storage: storage, fileFilter: fileFilter });
};

module.exports = createUploader;