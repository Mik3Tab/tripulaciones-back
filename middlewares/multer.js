const Multer = require('multer');

const mimetypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];

const generateUploadImageMulter = path => Multer({
    storage: Multer.diskStorage({
        destination: (req, file, cb) => cb(null, path),
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    }),
    fileFilter: (req, file, cb) => {
        if (mimetypes.includes(file.mimetype)) cb(null, true)
        else cb(null, false)
    },
    limits: { fileSize: 2 * 1024 * 1024 } 
});

const uploadUserImages = generateUploadImageMulter('./public/images/User');
const uploadPostImages = generateUploadImageMulter('./public/images/Post');
const uploadCommentImages = generateUploadImageMulter('./public/images/Comment');
const uploadChallengeImages = generateUploadImageMulter('./public/images/Challenge');
const uploadCompanyImages = generateUploadImageMulter('./public/images/Company');


module.exports = { uploadUserImages, uploadPostImages, uploadCommentImages, uploadChallengeImages, uploadCompanyImages};