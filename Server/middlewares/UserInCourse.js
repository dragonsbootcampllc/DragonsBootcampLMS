const {User, UserCourseProgress} = require("../Models/index");

exports.UserInCourse = async (courseId) => {
    try {
        const users = await User.findAll({
            include: [{
                model: UserCourseProgress,
                where: {
                    courseId,
                },
                attributes: []
             }],
        });
        return users
    } catch (err) {
        throw new Error(err.message);
    }
}