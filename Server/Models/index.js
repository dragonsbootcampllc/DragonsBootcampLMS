const Sequelize = require("sequelize");
const config = require("../config/config");
const sequelize = require("../config/database");

const UserCourseProgress = require("./usercourseprogress")
const User = require("./user");
const UserProfile = require("./user_profile");
const UserActivity = require("./user_activity");
const UserPreference = require("./user_preference");
const AIInsight = require("./ai_insight");
const StreamingContent = require("./streaming_content");
const BookResource = require("./book_resource");
const DiscussionThread = require("./discussion_thread");
const DiscussionPost = require("./discussion_post");
const ChatMessage = require("./chat_message");
const Chat = require("./chat");
const Notification = require("./notification");
const Lecture = require('./lecture');
const Task = require('./task');
const Course = require('./coures');
const Content = require('./content');
const Tag = require('./tag');
const Category = require('./category');
const UserTaskProgress = require('./userTaskPrpgress');
const UserLectureProgress = require("./userlectureprogress");
const ThreadParticipant = require("./threadParticipant");




// Define associations
DiscussionThread.belongsTo(Lecture, {foreignKey: 'linkedToId',constraints: false,
  scope: {
    linkedToType: 'Lecture',
  },
});

DiscussionThread.belongsTo(Course, {foreignKey: 'linkedToId',constraints: false,
  scope: {
    linkedToType: 'Course',
  },
});
User.hasOne(UserCourseProgress,{foreignKey:"userId"})
UserCourseProgress.belongsTo(User,{foreignKey:"userId"})

Course.hasMany(UserCourseProgress,{foreignKey:"courseId"})
UserCourseProgress.belongsTo(Course,{foreignKey:"courseId"})

User.hasMany(Course, { foreignKey: 'educatorId' });
Course.belongsTo(User, { foreignKey: 'educatorId', as: 'educator' });

User.hasMany(UserLectureProgress, { foreignKey: "userId" });
UserLectureProgress.belongsTo(User, { foreignKey: "userId" });

Lecture.hasMany(UserLectureProgress, { foreignKey: "lectureId" });
UserLectureProgress.belongsTo(Lecture, { foreignKey: "lectureId" });

User.hasMany(UserTaskProgress, { foreignKey: "userId" });
UserTaskProgress.belongsTo(User, { foreignKey: "userId" });

Task.hasMany(UserTaskProgress, { foreignKey: "taskId" });
UserTaskProgress.belongsTo(Task, { foreignKey: "taskId" });

Course.hasMany(Lecture, { foreignKey: 'courseId',
  as: 'lectures',
 });
Lecture.belongsTo(Course, { foreignKey: 'courseId',
  as: 'course',
 });

Lecture.hasMany(Task, { foreignKey: 'lectureId',
  as: 'tasks',
 });
Task.belongsTo(Lecture, { foreignKey: 'lectureId',
  as: 'lecture',
 });


Lecture.hasMany(Content, { foreignKey: 'lectureId' });
Content.belongsTo(Lecture, { foreignKey: 'lectureId' })

Lecture.hasOne(StreamingContent, { foreignKey: 'lectureId' });
StreamingContent.belongsTo(Lecture, { foreignKey: 'lectureId' });

User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(UserActivity, { foreignKey: "userId" });
UserActivity.belongsTo(User, { foreignKey: "userId" });

User.hasMany(UserPreference, { foreignKey: "userId" });
UserPreference.belongsTo(User, { foreignKey: "userId" });

User.hasMany(AIInsight, { foreignKey: "userId" });
AIInsight.belongsTo(User, { foreignKey: "userId" });

User.hasMany(StreamingContent, { foreignKey: "uploadedBy" });
StreamingContent.belongsTo(User, { foreignKey: "uploadedBy" });

User.hasMany(BookResource, { foreignKey: "uploadedBy" });
BookResource.belongsTo(User, { foreignKey: "uploadedBy" });

User.hasMany(Content, { foreignKey: "uploadedBy" });
Content.belongsTo(User, { foreignKey: "uploadedBy" });


Content.belongsToMany(Tag, { through: "ContentTags" ,  as: "contentTags", foreignKey: "contentId"});
Tag.belongsToMany(Content, { through: "ContentTags" ,  as: "contents", foreignKey: "tagId"});

Content.belongsToMany(Category, { through: "ContentCategories" ,  as: "contentCategories", foreignKey: "contentId"});
Category.belongsToMany(Content, { through: "ContentCategories" ,  as: "contents", foreignKey: "categoryId"});

User.hasMany(DiscussionThread, { foreignKey: "createdBy" });
DiscussionThread.belongsTo(User, { foreignKey: "createdBy" });

DiscussionThread.hasMany(DiscussionPost, { foreignKey: "threadId" });
DiscussionPost.belongsTo(DiscussionThread, { foreignKey: "threadId" });

User.hasMany(DiscussionPost, { foreignKey: "userId" });
DiscussionPost.belongsTo(User, { foreignKey: "userId" });


User.belongsToMany(DiscussionThread, { through: ThreadParticipant, foreignKey: 'userId', as: 'participatingThreads' });
DiscussionThread.belongsToMany(User, { through: ThreadParticipant, foreignKey: 'threadId',as: 'participants'});

Chat.hasMany(ChatMessage, { foreignKey: 'chatId', as: 'Messages' });
ChatMessage.belongsTo(Chat, { foreignKey: 'chatId', as: 'Chat' });
User.belongsToMany(Chat, { through: 'participant', as: 'chats', foreignKey: 'user_id'});
Chat.belongsToMany(User, { through: 'participant', as: 'participants', foreignKey: 'chat_id'});

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

User.hasMany(UserTaskProgress, { foreignKey: "userId" });
UserTaskProgress.belongsTo(User, { foreignKey: "userId" });

Task.hasMany(UserTaskProgress, { foreignKey: "taskId" });
UserTaskProgress.belongsTo(Task, { foreignKey: "taskId" });

module.exports = {
  sequelize,
  Sequelize,
  User,
  UserProfile,
  UserActivity,
  UserPreference,
  Course,
  AIInsight,
  StreamingContent,
  BookResource,
  Content,
  DiscussionThread,
  DiscussionPost,
  ChatMessage,
  Chat,
  Notification,
  Lecture,
  Task,
  UserCourseProgress,
  Tag,
  Category,
  UserTaskProgress,
  UserLectureProgress,
  ThreadParticipant,
};

