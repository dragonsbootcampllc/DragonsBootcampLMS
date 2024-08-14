const { Content } = require('../Models/content');
const { Lecture } = require('../Models/lecture');
const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

/**
 * @desc Ensure lecture exists
 * @route Middleware
 */
exports.ensureLectureExists = asyncHandler(async (lectureId, next) => {
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) {
        throw new ApiError("Lecture not found", 404);
    }
    return lecture;
});

/**
 * @desc Create a content
 * @route POST /api/lecture/:id/content
 * @access Educator
 */
exports.createContent = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ApiError(errors.array().map(err => err.msg).join(', '), 400));
    }

    const { title, description, type, url, file, text} = req.body;
    const lectureId = req.params.id;
    const uploadedBy = req.user.id;

    await ensureLectureExists(lectureId, next);

    try {
        const content = await Content.create({
            title,
            description,
            type,
            url: url || null,
            file: file || null,
            text: text || null,
            uploadedBy,
            lectureId,
        });

        return res.status(201).json(content);
    } catch (err) {
        return next(new ApiError(err.message, 500));
    }
});

/**
 * @desc Get all contents
 * @route GET /api/lecture/:id/content
 * @param page - number of page
 * @param limit - number of items per page
 * @example /api/lecture/1/content?page=1&limit=10
 * @access Educator, Student
 */
exports.getContents = asyncHandler(async (req, res, next) => {
    const lectureId = req.params.id;

    await ensureLectureExists(lectureId, next);

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows: contents } = await Content.findAndCountAll({
            where: {
                lectureId
            },
            limit,
            offset,
        });

        return res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            contents,
        });
    } catch (err) {
        return next(new ApiError(err.message, 500));
    }
});

/**
 * @desc Get a content
 * @route GET /api/lecture/:id/content/:id
 * @access Educator, Student
 */
exports.getContent = asyncHandler(async (req, res, next) => {
    const { lectureId, contentId } = req.params;

    await ensureLectureExists(lectureId, next);

    try {
        const content = await Content.findOne({
            where: {
                id: contentId,
                lectureId,
            },
        });

        if (!content) {
            return next(new ApiError("Content not found", 404));
        }

        return res.status(200).json(content);
    } catch (err) {
        return next(new ApiError(err.message, 500));
    }
});

/**
 * @desc Update a content
 * @route PUT /api/lecture/:id/content/:id
 * @access Educator
 */
exports.updateContent = asyncHandler(async (req, res, next) => {
    const { lectureId, contentId } = req.params;
    const { title, description, type, url, file, text } = req.body;

    await ensureLectureExists(lectureId, next);

    if (!title || !description || !type || !url || !file || !text || !lectureId) {
        return next(new ApiError("All fields are required", 400));
    }

    try {
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
        content.type = type || content.type;
        content.url = url || content.url;
        content.file = file || content.file;
        content.text = text || content.text;

        await content.save();

        return res.status(200).json(content);
    } catch (err) {
        return next(new ApiError(err.message, 500));
    }
});

/**
 * @desc Delete a content
 * @route DELETE /api/lecture/:id/content/:id
 * @access Educator
 */
exports.deleteContent = asyncHandler(async (req, res, next) => {
    const { lectureId, contentId } = req.params;
    
    await ensureLectureExists(lectureId, next);

    try {
        const content = await Content.findOne({
            where: {
                id: contentId,
                lectureId,
            },
        });

        if (!content) {
            return next(new ApiError("Content not found", 404));
        }

        await content.destroy();
        return res.status(200).json({ message: "Content deleted successfully" });
    } catch (err) {
        return next(new ApiError(err.message, 500));
    }
});
