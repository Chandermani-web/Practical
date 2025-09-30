import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "social-app"; // default folder
    if (file.mimetype.startsWith("image")) folder = "social-app/images";
    else if (file.mimetype.startsWith("video")) folder = "social-app/videos";

    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "mov", "webm"],
    };
  },
});

const upload = multer({ storage });

export default upload;
