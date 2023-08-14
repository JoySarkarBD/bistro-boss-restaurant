const multer = require('multer');
const path = require('path');
const fs = require('fs')
const createError = require('http-errors');

const uploader = (subFolder, allowedFileType, fileSize, errMsg) => {
    const uploadFolder = path.join(__dirname, `./../../public/uploads/${subFolder}`);
    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, {recursive: true})
    }

    // file upload destination
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadFolder)
        },

        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                "-" +
                Date.now();

            cb(null, fileName + fileExt);
        },
    })

    const fileFilter = (req, file, cb) => {
        if (allowedFileType.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(createError(errMsg));
        }
    };

    const upload = multer({
        storage,
        limits: {fileSize},
        fileFilter
    })
    return upload

}

module.exports = uploader