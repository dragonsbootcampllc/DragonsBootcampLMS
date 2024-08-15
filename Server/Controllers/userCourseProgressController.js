const { UserCourseProgress } = require('../Models');

exports.storeProgress = async (req, res, next) => {
    try {
    const { userId, courseId } = req.body;

    let progress = await UserCourseProgress.findOne({ where: { userId, courseId } });
    if (!progress) {
        progress = await UserCourseProgress.create({ userId, courseId, startedAt: new Date() });
    } else {
        await progress.update({ completedAt: new Date(), isCompleted: true });
    }

    res.status(201).json(progress);
    } catch (error) {
    next(error);
    }
};

exports.retrieveProgress = async (req, res, next) => {
    try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const progress = await UserCourseProgress.findOne({ where: { userId, courseId } });
    if (!progress) {
        return res.status(404).json({ message: 'Progress not found' });
    }

    res.status(200).json(progress);
    } catch (error) {
    next(error);
    }
};
