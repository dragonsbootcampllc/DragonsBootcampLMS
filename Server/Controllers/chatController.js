const { Chat } = require('../Models/index');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

exports.getChatMessages = asyncHandler(async (req, res, next) => {
    const { chatId } = req.params;

    if (!chatId) {
        return next(new ApiError('Chat ID is required', 400));
    }

    const chatExists = await Chat.findOne({
        where: { chatId }
    });

    if (!chatExists) {
        return next(new ApiError('Chat ID not found', 404));
    }

    const messages = await Chat.findAll({
        where: { chatId },
        order: [['createdat', 'ASC']], 
    });
    
    res.json(messages)
});
