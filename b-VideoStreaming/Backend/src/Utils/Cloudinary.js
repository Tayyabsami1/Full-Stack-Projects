import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const UploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const UploadResult = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });
        console.log("File is uploaded on Cloudinary", UploadResult.url);
        return UploadResult;
    }
    catch (err) {
        // to remove the corrupted file from our temp folder
        fs.unlinkSync(filePath);
        return null;
    }
}

export {UploadOnCloudinary};