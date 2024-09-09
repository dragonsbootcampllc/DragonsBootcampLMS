const express = require('express');
const router = express.Router();
const { getChatMessages } = require('../Controllers/chatController');
const protect = require('../middlewares/protect');

/**
 * @swagger
 * tags:
 *   - name: Chat
 *     description: Operations related to chat messages
 * 
 * /api/chat/messages:
 *   get:
 *     summary: Retrieve messages for a specific chat
 *     description: Fetch all messages associated with a specific chat ID, ordered by creation date.
 *     tags:
 *       - Chat
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: The number of messages per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       '200':
 *         description: Successfully retrieved chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the message.
 *                   chatId:
 *                     type: string
 *                     description: The ID of the chat to which the message belongs.
 *                   senderId:
 *                     type: string
 *                     description: The ID of the user who sent the message.
 *                   receiverId:
 *                     type: string
 *                     description: The ID of the user who received the message.
 *                   message:
 *                     type: string
 *                     description: The content of the message.
 *                   linkUrl:
 *                     type: string
 *                     description: A URL link associated with the message (if any).
 *                   imageUrl:
 *                     type: string
 *                     description: A URL to an image associated with the message (if any).
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the message was created.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the message was last updated.
 *       '400':
 *         description: Bad Request - Chat ID is required or invalid.
 *       '404':
 *         description: Not Found - Chat ID not found or no messages found.
 *       '500':
 *         description: Internal Server Error - An error occurred while fetching messages.
 */



router.get('/messages',protect, getChatMessages);

module.exports = router;
