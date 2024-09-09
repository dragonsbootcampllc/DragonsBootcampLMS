const { Chat } = require('../Models/index');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

exports.getChatMessages = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return next(new ApiError('User not authenticated', 401));
    }

    const userId = req.user.id;  
    const limit = parseInt(req.query.limit) || 10;  
    const page = parseInt(req.query.page) || 1;    
    const skip = (page - 1) * limit;

    
    const distinctReceivers = await Chat.findAll({
        attributes: ['receiverId'],
        where: {
            senderId: userId,
        },
        group: ['receiverId'],
        order: [['receiverId', 'ASC']]
    });

    if (!distinctReceivers || distinctReceivers.length === 0) {
        return next(new ApiError('No messages found for this sender', 404));
    }

    
    const chats = await Promise.all(distinctReceivers.map(async (receiver) => {
        const receiverId = receiver.receiverId;
        const messages = await Chat.findAll({
            where: {
                senderId: userId,
                receiverId: receiverId
            },
            order: [['createdat', 'ASC']],  
            limit,
            offset: skip
        });
        return {
            receiverId,
            messages: messages.map((msg) => ({
                id: msg.id,
                message: msg.message,
                imageUrl: msg.imageUrl,
                linkUrl: msg.linkUrl,
                createdAt: msg.createdAt
            }))
        };
    }));

    res.json({ chats });
});

