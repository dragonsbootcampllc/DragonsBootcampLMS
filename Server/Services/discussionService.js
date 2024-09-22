const { DiscussionPost, DiscussionThread, ThreadParticipant } = require("../Models");

exports.savePost = async (postData) => {
    try {
        console.log("Saving postData:", postData);
        const thread = await DiscussionThread.findByPk(postData.threadId);
        if (!thread) {
            throw new Error("Thread not found");
        }

        const isParticipant = await ThreadParticipant.findOne({
            where: {
                threadId: postData.threadId,
                userId: postData.userId,
            },
        });

        if (!isParticipant) {
            await ThreadParticipant.create({
                threadId: postData.threadId,
                userId: postData.userId,
            });
        }

        const newPost = await DiscussionPost.create({
            threadId: postData.threadId,
            userId: postData.userId,
            post: postData.post,
        });
        return newPost;
    } catch (error) {
        console.error("Error in savePost service:", error.message || error);
        throw new Error("Error saving post: " + error.message);
    }
};

exports.findThreadById = async (threadId) => {
    return await DiscussionThread.findByPk(threadId); 
};

exports.createThread = async (threadData) => {
    try {
        const newThread = await DiscussionThread.create({
            title: threadData.title,
            createdBy: threadData.createdBy,
            linkedToId: threadData.linkedToId,
            linkedToType: threadData.linkedToType,
        });
        return newThread;
    } catch (error) {
        throw new Error("Error creating thread: " + error.message);
    }
};

exports.checkThreadParticipant = async (threadId, userId) => {
    const participant = await ThreadParticipant.findOne({
        where: {
            threadId,
            userId,
        },
    });
    return !!participant; 
};


exports.addThreadParticipant = async (threadId, userId) => {
    try {
        await ThreadParticipant.create({
            threadId,
            userId,
        });
    } catch (error) {
        throw new Error("Error adding participant: " + error.message);
    }
};