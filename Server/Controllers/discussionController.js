const ApiError = require("../utils/ApiError");
const asyncHandler = require('express-async-handler');
const { DiscussionThread } = require('../Models/index');

exports.createDiscussion = asyncHandler(async (req, res, next) => {
    try {
        const { title } = req.body;
        const createdBy = req.user.id;

        if (!title) {
            return next(new ApiError('Title is required to create a discussion',400));
        }

        const discussion = await DiscussionThread.create({ title, createdBy });
        res.status(201).json({
            success: true,
            message: 'Discussion thread created successfully',
            data: discussion,
        });
    } catch (error) {
        next(new ApiError('Failed to create discussion thread',500));
    }
});

exports.updateDiscussion = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const discussion = await DiscussionThread.findByPk(id);

        if (!title) {
            return next(new ApiError( 'Title is required to update the discussion',400));
        }

        if (!discussion) {
            return next(new ApiError( 'Discussion thread not found',404));
        }

        if (discussion.createdBy !== req.user.id) {
            return next(new ApiError( 'You are not authorized to update this discussion',403));
        }

        discussion.title = title;
        await discussion.save();

        res.status(200).json({
            success: true,
            message: 'Discussion thread updated successfully',
            data: discussion,
        });
    } catch (error) {
        next(new ApiError('Failed to update discussion thread',500));
    }
});

exports.deleteDiscussion = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const discussion = await DiscussionThread.findByPk(id);

        if (!discussion) {
            return next(new ApiError( 'Discussion thread not found',404));
        }

        if (discussion.createdBy !== req.user.id) {
            return next(new ApiError('You are not authorized to delete this discussion',403));
        }

        await discussion.destroy();

        res.status(200).json({
            success: true,
            message: 'Discussion thread deleted successfully',
        });
    } catch (error) {
        next(new ApiError( 'Failed to delete discussion thread',500));
    }
});
