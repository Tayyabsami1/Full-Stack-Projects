import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const UploadOnCloudinary = async (filePath) => {
      // Configuration
      cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_KEY, 
        api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
    });
    
    try {
        if (!filePath) return null;
        const UploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        // console.log("File is uploaded on Cloudinary", UploadResult.url);
        fs.unlinkSync(filePath);
        return UploadResult;
    }
    catch (err) {
        // to remove the corrupted file from our temp folder
        // console.log("Files removed")
        fs.unlinkSync(filePath);
        return null;
    }
}

export {UploadOnCloudinary};