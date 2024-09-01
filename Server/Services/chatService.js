const { ChatMessage } = require("../Models");

exports.saveMessage = async (messageData) => {
    try {
        const message = await ChatMessage.create(messageData);
        return message;
    } catch (err) {
        throw new Error(err.message);
    }
}