import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'posts';
    let resource_type = 'auto'; // auto-detects image/video

    if (file.mimetype.startsWith('video')) {
      resource_type = 'video';
      folder += '/videos';
    } else if (file.mimetype.startsWith('image')) {
      resource_type = 'image';
      folder += '/images';
    }

    return {
      folder,
      resource_type,
    };
  },
});

const upload = multer({ storage , limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit

export default upload;
