const ApiError = require("../utils/ApiError");
const asyncHandler = require('express-async-handler');
const { UserCourseProgress,DiscussionThread, DiscussionPost ,ThreadParticipant, Notification } = require('../Models/index');
const { createThread,checkEntityAndProgress, checkThreadParticipant, addThreadParticipant, savePost } = require('../Services/discussionService');
const { notifyUsers } = require('../services/notificationService'); 

exports.createDiscussion = asyncHandler(async (req, res, next) => {
    try {
        const { title, linkedToId, linkedToType } = req.body;
        const createdBy = req.user.id;

        if (!title || !linkedToId || !linkedToType) {
            return next(new ApiError('Title, linkedToId, and linkedToType are required to create a discussion', 400));
        }

        await checkEntityAndProgress(linkedToType.toLowerCase(), linkedToId, createdBy);

        const discussion = await createThread({
            title,
            createdBy,
            linkedToId,
            linkedToType: linkedToType.toLowerCase()
        });

        // Fetch users who have made progress in the linked course
        const progressUsers = await UserCourseProgress.findAll({
            where: { courseId: linkedToId }, 
            attributes: ['userId'] 
        });

        const userIds = progressUsers.map(progress => progress.userId);
        const io = req.app.get('io'); 

        // Create the notification message
        const notificationMessage = `A new discussion thread titled "${title}" has been created in your course.`;
        
        // Notify all users who have made progress in the course
        await notifyUsers(io, userIds, notificationMessage, discussion.id, null);

        res.status(201).json({
            success: true,
            message: 'Discussion thread created successfully',
            data: discussion,
        });
    } catch (error) {
        console.error('Error creating discussion thread:', error);
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

        const isParticipant = await checkThreadParticipant(threadId, userId);
        if (!isParticipant) {
            await addThreadParticipant(threadId, userId); 
        }

        const newPost = await savePost({
            threadId,
            userId,
            post,
        });

        const participants = await ThreadParticipant.findAll({
            where: { threadId },
            attributes: ['userId']
        });
        
        const participantIds = participants.map(participant => participant.userId);
        const io = req.app.get('io'); 

        const notificationMessage = `A new message titled "${thread.title}" has been posted by user ${userId}: "${post}".`;

        // Notify participants
        await notifyUsers(io, participantIds, notificationMessage, thread.id, newPost.id);

        res.status(201).json({
            success: true,
            message: 'Message posted successfully',
            data: newPost,
        });
    } catch (error) {
        console.error("Error posting message:", error.message);
        next(new ApiError('Failed to post message', 500));
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
