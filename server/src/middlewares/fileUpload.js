const uploader = require("../helpers/imageUploader");

function fileUpload(req, res, next) {
    const upload = uploader(`${req.params.userId}/avatar`, ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only jpeg., jpg & png format are allowed")

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(400).json({
                errors: {
                    avatar: err.message,
                },
            });
        } else {
            next();
        }
    });
}

module.exports = fileUpload