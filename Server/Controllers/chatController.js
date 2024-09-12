const { Chat, ChatMessage, User } = require('../Models/index');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');


exports.getChatMessages = asyncHandler(async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return next(new ApiError('User not authenticated', 401));
    }

    const userId = req.user.id;  
    const limit = parseInt(req.query.limit) || 10;  
    const page = parseInt(req.query.page) || 1;    
    const skip = (page - 1) * limit;

    const chats = await Chat.findAll({
        attributes: ['id'],
        include: [
            {
                model: User,
                as: 'participants',
                where: { id: userId },
                attributes: []
            }
        ]
    });

    if (!chats) {
        return next(new ApiError('No chats found for this user', 404));
    }

    const chatIds = chats.map(chat => chat.id);

    const chatMessages = await Promise.all(chatIds.map(async (chatId) => {
        const messages = await ChatMessage.findAll({
            where: {
                chatId,
                [Op.or]: [
                    { senderId: userId },  
                    { receiverId: userId } 
                ]
            },
            order: [['createdat', 'ASC']],
            limit,
            offset: skip
        });

        return {
            chatId,
            messages: messages.map((msg) => ({
                id: msg.id,
                message: msg.message,
                senderId: msg.senderId,
                receiverId: msg.receiverId,
                isSender: msg.senderId === userId, 
                createdAt: msg.createdAt
            }))
        };
    }));

    res.json({ chatMessages });
});
