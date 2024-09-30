const ApiError = require("../utils/ApiError");
const asyncHandler = require('express-async-handler');
const { DiscussionThread, DiscussionPost ,ThreadParticipant } = require('../Models/index');
const { checkEntityAndProgress } = require('../Services/discussionService'); 
const discussionService = require("../Services/discussionService");


exports.createDiscussion = asyncHandler(async (req, res, next) => {
    try {
        const { title, linkedToId, linkedToType } = req.body;
        const createdBy = req.user.id; 

        if (!title || !linkedToId || !linkedToType) {
            return next(new ApiError('Title, linkedToId, and linkedToType are required to create a discussion', 400));
        }

        const lowerCaseType = linkedToType.toLowerCase();

        // Check if the user has made progress in the linked entity
        await checkEntityAndProgress(lowerCaseType, linkedToId, createdBy);

        const discussion = await DiscussionThread.create({
            title,
            createdBy,
            linkedToId,
            linkedToType: lowerCaseType
        });

        res.status(201).json({
            success: true,
            message: 'Discussion thread created successfully',
            data: discussion,
        });
    } catch (error) {
        if (error.message.includes('not found') || error.message.includes('progress')) {
            return next(new ApiError(error.message, 404));
        }
        next(new ApiError('Failed to create discussion thread', 500));
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

exports.postMessage = asyncHandler(async (req, res, next) => {
    try {
        const { id: threadId } = req.params; 
        const { post } = req.body; 
        const userId = req.user.id;

        const thread = await DiscussionThread.findByPk(threadId);

        if (!thread) {
            return next(new ApiError('Thread not found', 404));
        }

        const isParticipant = await ThreadParticipant.findOne({
            where: {
                threadId,
                userId,
            },
        });

        if (!isParticipant) {
            await discussionService.addThreadParticipant(threadId, userId);
        }

        const newPost = await DiscussionPost.create({
            threadId: threadId,
            userId,
            post,
        });

        res.status(201).json({
            success: true,
            message: 'Message posted successfully',
            data: newPost,
        });
    } catch (error) {
        console.error("Error posting message:", error.message);
        res.status(500).json({ message: 'Failed to post message' });
    }
});


exports.getMessages = asyncHandler(async (req, res, next) => {
    try {
        const { id: threadId } = req.params;

        const messages = await DiscussionPost.findAll({
            where: { threadId },
            order: [['createdat', 'ASC']], 
        });

        if (!messages.length) {
            return res.status(404).json({
                success: true,
                message: 'No messages found for this thread.',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Messages retrieved successfully',
            data: messages,
        });
    } catch (error) {
        console.error("Error retrieving messages:", error.message);
        next(new ApiError('Failed to retrieve messages', 500));
    }
});
