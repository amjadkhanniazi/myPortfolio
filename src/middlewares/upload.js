// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Ensure uploads directory exists
// const uploadDir = path.join(process.cwd(), 'uploads', 'profiles');
// const cvDir = path.join(process.cwd(), 'uploads', 'cvs');

// [uploadDir, cvDir].forEach(dir => {
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, { recursive: true });
//     }
// });

// // Configure storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         // Create unique filename: userId_timestamp_originalname
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, `${req.user.id}_${uniqueSuffix}${path.extname(file.originalname)}`);
//     }
// });

// // Storage for CV files
// const cvStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, cvDir);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, `cv_${req.user.id}_${uniqueSuffix}${path.extname(file.originalname)}`);
//     }
// });



// // File filter to accept only images
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif|webp/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
//     }
// };

// // File filter for CV (PDF only)
// const cvFilter = (req, file, cb) => {
//     const allowedTypes = /pdf/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = file.mimetype === 'application/pdf';

//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed for CV'));
//     }
// };


// // Configure multer
// export const uploadProfileImgMiddleWare = multer({
//     storage: storage,
//     limits: {
//         fileSize: 2 * 1024 * 1024 // 5MB limit
//     },
//     fileFilter: fileFilter
// });

// export const uploadCVMiddleWare = multer({
//     storage: cvStorage,
//     limits: {
//         fileSize: 3 * 1024 * 1024 // 10MB limit for CV
//     },
//     fileFilter: cvFilter
// });


import multer from 'multer';
import path from 'path';

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// File filter for images
const imageFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
};

// File filter for CV
const cvFilter = (req, file, cb) => {
    const allowedTypes = /pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype === 'application/pdf';

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed for CV'));
    }
};

export const uploadProfileImgMiddleWare = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 5MB
    },
    fileFilter: imageFilter
});

export const uploadCVMiddleWare = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024 // 10MB
    },
    fileFilter: cvFilter
});