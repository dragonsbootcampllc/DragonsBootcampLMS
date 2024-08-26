const { Content, Tag, Category, Lecture } = require("../Models/index");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const ensureLectureExists = async (lectureId) => {
  const lecture = await Lecture.findByPk(lectureId);
  if (!lecture) {
    throw new ApiError("Lecture not found", 404);
  }
  return lecture;
};

exports.createContent = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    contentType,
    contentUrl,
    contentText,
    tags,
    categories,
  } = req.body;
  const lectureId = req.params.lectureId;
  const uploadedBy = req.user.id;
  if (!title || !description || !contentType || !uploadedBy || !lectureId) {
    return next(new ApiError("All fields are required", 400));
  }
  await ensureLectureExists(lectureId);

  try {
    if (req.file) {
      const resourceType = req.file.mimetype.startsWith("video")
        ? "video"
        : "auto";
      //! TODO: handle file upload to a different service
    }

    // Validate content type
    if (contentType === "link" && !contentUrl) {
      return res
        .status(400)
        .json({ error: "Content URL is required for link type." });
    }
    if (contentType === "file" && !req.file) {
      return res.status(400).json({ error: "File is required for file type." });
    }
    if (contentType === "text" && !contentText) {
      return res
        .status(400)
        .json({ error: "Text content is required for text type." });
    }

    // Prepare tags and categories
    const tagArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];
    const categoryArray = categories
      ? categories.split(",").map((category) => category.trim())
      : [];

    // Create content with associations
    const newContent = await Content.create(
      {
        title,
        description,
        contentType,
        contentText,
        uploadedBy,
        lectureId,
        contentUrl,
        contentTags: tagArray.map((name) => ({ name })),
        contentCategories: categoryArray.map((name) => ({ name })),
      },
      {
        include: [
          { model: Tag, as: "contentTags" },
          { model: Category, as: "contentCategories" },
        ],
      }
    );

    const contentWithAssociations = await Content.findByPk(newContent.id, {
      include: [
        { model: Tag, as: "contentTags" },
        { model: Category, as: "contentCategories" },
      ],
    });

    res.status(201).json({
      status: "success",
      data: contentWithAssociations,
    });
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

exports.getAllContents = asyncHandler(async (req, res, next) => {
  const lectureId = req.params.lectureId;
  console.log("lectureId", lectureId);
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const { tags, categories } = req.query;

  let whereClause = { lectureId };
  let includeClause = [
    { model: Tag, as: "contentTags", through: { attributes: [] } },
    { model: Category, as: "contentCategories", through: { attributes: [] } },
  ];

  if (tags) {
    includeClause[0].where = { name: { [Op.in]: tags.split(",") } };
  }

  if (categories) {
    includeClause[1].where = { name: { [Op.in]: categories.split(",") } };
  }

  const { count, rows } = await Content.findAndCountAll({
    where: whereClause,
    include: includeClause,
    limit,
    skip,
    distinct: true,
  });

  const totalPages = Math.ceil(count / limit);

  res.status(200).json({
    status: "success",
    data: rows,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: count,
      itemsPerPage: limit,
    },
  });
});

exports.getContentById = asyncHandler(async (req, res, next) => {
  const { lectureId, contentId } = req.params;
  const content = await Content.findOne({
    where: {
      id: contentId,
      lectureId,
    },
    include: [
      { model: Tag, as: "contentTags", through: { attributes: [] } },
      { model: Category, as: "contentCategories", through: { attributes: [] } },
    ],
  });
  if (!content) {
    return next(new ApiError("Content not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: content,
  });
});

// Update content
exports.updateContent = asyncHandler(async (req, res, next) => {
  const { title, description, contentType, contentText, tags, categories } =
    req.body;
  const { lectureId, contentId } = req.params;

  const content = await Content.findOne({
    where: {
      id: contentId,
      lectureId,
    },
  });

  if (!content) {
    return next(new ApiError("Content not found", 404));
  }

  content.title = title || content.title;
  content.description = description || content.description;
  content.contentType = contentType || content.contentType;
  content.contentText = contentText || content.contentText;

  if (req.file) {
    const resourceType = req.file.mimetype.startsWith("video")
      ? "video"
      : "auto";
    //! TODO: handle file upload to a different service
  }

  await content.save();

  // Update tags
  if (tags) {
    const tagArray = tags.split(",").map((tag) => tag.trim());
    const tagInstances = await Promise.all(
      tagArray.map((name) => Tag.findOrCreate({ where: { name } }))
    );
    await content.setContentTags(tagInstances.map(([tag]) => tag));
  }

  // Update categories
  if (categories) {
    const categoryArray = categories
      .split(",")
      .map((category) => category.trim());
    const categoryInstances = await Promise.all(
      categoryArray.map((name) => Category.findOrCreate({ where: { name } }))
    );
    await content.setContentCategories(
      categoryInstances.map(([category]) => category)
    );
  }

  const updatedContent = await Content.findByPk(contentId, {
    include: [
      { model: Tag, as: "contentTags", through: { attributes: [] } },
      { model: Category, as: "contentCategories", through: { attributes: [] } },
    ],
  });

  res.status(200).json({
    status: "success",
    data: updatedContent,
  });
});

// DELETE content
exports.deleteContent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const content = await Content.findByPk(id);

  if (!content) {
    return next(new ApiError("Content not found", 404));
  }

  await content.destroy();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
