import multer from 'multer';


// Configure storage
const storage = multer.diskStorage({
 
  filename: (req, file, cb) => {
   
    cb(null,file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

export { upload };
