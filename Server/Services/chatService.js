const { ChatMessage } = require("../Models");

exports.saveMessage = async (data) => {
    try {
        const message = await ChatMessage.create(data);
        return message;
    } catch (err) {
        throw new Error(err.message);
    }
}