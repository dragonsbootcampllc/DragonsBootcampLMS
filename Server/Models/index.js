const Sequelize = require("sequelize");
const config = require("../config/config");
const sequelize = require("../config/database");

const User = require("./user");
const UserProfile = require("./user_profile");
const UserActivity = require("./user_activity");
const UserPreference = require("./user_preference");
const AIInsight = require("./ai_insight");
const StreamingContent = require("./streaming_content");
const BookResource = require("./book_resource");
const Content = require("./content");
const DiscussionThread = require("./discussion_thread");
const DiscussionPost = require("./discussion_post");
const ChatMessage = require("./chat_message");
const Notification = require("./notification");
const Lecture = require('./lecture');
const Task = require('./task');
const Course = require('./coures');


// Define associations
Course.hasMany(Lecture, { foreignKey: 'courseId' });
Lecture.belongsTo(Course, { foreignKey: 'courseID' });

Lecture.hasMany(Task, { foreignKey: 'lectureId' });
Task.belongsTo(Lecture, { foreignKey: 'lectureId' });

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

User.hasMany(DiscussionThread, { foreignKey: "createdBy" });
DiscussionThread.belongsTo(User, { foreignKey: "createdBy" });

DiscussionThread.hasMany(DiscussionPost, { foreignKey: "threadId" });
DiscussionPost.belongsTo(DiscussionThread, { foreignKey: "threadId" });

User.hasMany(DiscussionPost, { foreignKey: "userId" });
DiscussionPost.belongsTo(User, { foreignKey: "userId" });

User.hasMany(ChatMessage, { foreignKey: "senderId", as: "SentMessages" });
User.hasMany(ChatMessage, { foreignKey: "receiverId", as: "ReceivedMessages" });
ChatMessage.belongsTo(User, { foreignKey: "senderId", as: "Sender" });
ChatMessage.belongsTo(User, { foreignKey: "receiverId", as: "Receiver" });

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

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
  Notification,
  Lecture,
  Task,
};
