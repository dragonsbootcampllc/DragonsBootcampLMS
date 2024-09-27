const { Course, Lecture, Task, UserCourseProgress, UserLectureProgress,UserTaskProgress,DiscussionPost, ThreadParticipant, DiscussionThread } = require("../Models");

exports.checkEntityAndProgress = async (linkedToType, linkedToId, userId) => {
        const entityMap = {
            course: { model: Course },
            lecture: { model: Lecture },
        };

        if (!entityMap[linkedToType]) {
            throw new Error(`Invalid linkedToType: ${linkedToType}. Expected one of 'course', 'lecture'.`);
        }

        const { model } = entityMap[linkedToType];

        const entity = await model.findByPk(linkedToId);
        if (!entity) {
            const notFoundMessage = `${linkedToType.charAt(0).toUpperCase() + linkedToType.slice(1)} not found.`;
            throw new Error(notFoundMessage);
        }

        // For lectures, check if the user has made progress in the associated course
        if (linkedToType === 'lecture') {
            const courseId = entity.courseId; 
            if (!courseId) {
                throw new Error('Lecture is not associated with any course.');
            }

            const courseProgress = await UserCourseProgress.findOne({
                where: { courseId, userId },
            });

            if (!courseProgress) {
                throw new Error('You have not made any progress in the course associated with the selected lecture.');
            }
        }
        
        return true; 
};


exports.savePost = async (postData) => {
    try {
        console.log("Saving postData:", postData);
        const thread = await DiscussionThread.findByPk(postData.threadId);
        if (!thread) {
            throw new Error("Thread not found");
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
    const { linkedToId, linkedToType, createdBy, title } = threadData;

    try {
        await checkEntityAndProgress(linkedToType, linkedToId, createdBy);
        return await DiscussionThread.create({ title, createdBy, linkedToId, linkedToType });
    } catch (error) {
        console.error(`Error creating thread with linkedToId: ${linkedToId}, linkedToType: ${linkedToType}`);
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