const cloudinary = require('../config/cloudinaryConfig');
//const fs = require('fs');

const uploadToCloudinary = async (filePath, resourceType = 'auto') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder: 'videos', 
    });

    // Remove the file after upload
    //fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

module.exports = {
  uploadToCloudinary,
};
