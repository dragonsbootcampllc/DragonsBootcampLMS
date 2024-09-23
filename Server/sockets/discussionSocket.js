const discussionService = require("../Services/discussionService");

module.exports = (io, socket) => {
    socket.on("createThread", async (threadData) => {
        const newThread = await discussionService.createThread(threadData);
        io.emit("newThread", newThread);
    });

    socket.on("newThreadMessage", async (messageData) => {
        const { threadId, userId } = messageData;
        const threadExists = await discussionService.findThreadById(threadId);

        if (!threadExists) {
            socket.emit("Not_thread", `Thread ID ${threadId} does not exist.`);
            return;
        }

        const isParticipant = await discussionService.checkThreadParticipant(threadId, userId);

        if (!isParticipant) {
            await discussionService.addThreadParticipant(threadId, userId);
        }

        const newMessage = await discussionService.savePost(messageData);

        io.to(`thread_${threadId}`).emit("newMessageInThread", newMessage);
    });
};
