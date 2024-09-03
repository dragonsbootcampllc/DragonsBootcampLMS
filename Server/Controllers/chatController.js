const { ChatMessage } = require("../Models");
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

exports.getChatMessages = asyncHandler(async (req, res, next) => {
const { chatId } = req.params;

if (!chatId) {
    return next(new ApiError('Chat ID is required', 400));
}

const chatExists = await ChatMessage.findOne({
    where: { chatId }
});

if (!chatExists) {
    return next(new ApiError('Chat ID not found', 404));
}

const messages = await ChatMessage.findAll({
    where: { chatId },
    order: [['createdat', 'ASC']], // Order messages by creation date
});

if (messages.length === 0) {
    return next(new ApiError('No messages found for this chat ID', 404));
}

res.json(messages);
});
