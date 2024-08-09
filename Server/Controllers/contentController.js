const Content = require("../Models/content");
const { uploadToCloudinary } = require("../Services/cloudinaryService");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

exports.createContent = asyncHandler(async (req, res, next) => {
  const { title, description, contentType, contentText, uploadedBy, lectureId } = req.body;
     
  if(!title || !description || !contentType || !uploadedBy || !lectureId) {
   return next(
     new ApiError("All fields are required", 400)
   )
  } 
  try {
      let contentUrl = null;
      if (req.file) {
  
        const resourceType = req.file.mimetype.startsWith('video') ? 'video' : 'auto';
        
        contentUrl = await uploadToCloudinary(req.file.path, resourceType);
      }
  
      // Validate content type
      if (contentType === 'link' && !contentUrl) {
        return res.status(400).json({ error: 'Content URL is required for link type.' });
      }
      if (contentType === 'file' && !req.file) {
        return res.status(400).json({ error: 'File is required for file type.' });
      }
      if (contentType === 'text' && !contentText) {
        return res.status(400).json({ error: 'Text content is required for text type.' });
      }
  
      const newContent = new Content({
        title,
        description,
        contentType,
        contentUrl: req.file ? req.file.path : null, 
        contentFile: req.file ? req.file.filename : null,
        uploadedBy,
        lectureId,
      });
      await newContent.save();
      res.status(201).json(newContent);
    } catch (error) {
      console.error('Error creating content:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  // Update content
exports.updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, contentType, contentUrl, contentText, lectureId } = req.body;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Update the content
    await content.update({
      title,
      description,
      contentType,
      contentUrl,
      contentText,
      lectureId,
      contentFile: req.file ? req.file.filename : content.contentFile,
    });

    res.status(200).json(content);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete content
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Delete the content
    await content.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  
