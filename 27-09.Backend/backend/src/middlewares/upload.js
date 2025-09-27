import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        if(file.mimetype.startsWith("image")){
            cb(null, "../../public/uploads/images");
        } else if(file.mimetype.startsWith("video")){
            cb(null, "../../public/uploads/videos");
        } else {
            cb({message: "This file is not supported"}, false);
        }
    },

    filename: function (req,file,cb){
        const uniquename = Date.now() + "=" + path.extname(file.originalname);
        cb(null, uniquename);
    }
});

const upload = multer({ storage: storage });

export default upload;