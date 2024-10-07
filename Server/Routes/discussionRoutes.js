const {createDiscussion, updateDiscussion, deleteDiscussion, getMessages, postMessage} = require('../Controllers/discussionController');

const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');

/**
 * @swagger
 * /api/discussion:
 *   post:
 *     summary: Create a new discussion thread
 *     description: Allows a user to create a new discussion thread.
 *     tags: [Discussion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the discussion thread
 *     responses:
 *       201:
 *         description: Discussion thread created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     createdBy:
 *                       type: integer
 *                     updatedat:
 *                       type: string
 *                       format: date-time
 *                     createdat:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request (title is missing)
 *       500:
 *         description: Failed to create discussion thread
 */

/**
 * @swagger
 * /api/discussion/{id}:
 *   put:
 *     summary: Update a discussion thread
 *     description: Allows a user to update an existing discussion thread.
 *     tags: [Discussion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the discussion thread
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title of the discussion thread
 *     responses:
 *       200:
 *         description: Discussion thread updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       403:
 *         description: Unauthorized to update this discussion
 *       404:
 *         description: Discussion thread not found
 *       500:
 *         description: Failed to update discussion thread
 */

/**
 * @swagger
 * /api/discussion/{id}:
 *   delete:
 *     summary: Delete a discussion thread
 *     description: Allows a user to delete a discussion thread.
 *     tags: [Discussion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the discussion thread
 *     responses:
 *       200:
 *         description: Discussion thread deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       403:
 *         description: Unauthorized to delete this discussion
 *       404:
 *         description: Discussion thread not found
 *       500:
 *         description: Failed to delete discussion thread
 */


router.post('/', protect,createDiscussion);
router.put('/:id', protect, updateDiscussion);
router.delete('/:id', protect, deleteDiscussion);
router.post('/:id/messages',protect, postMessage);
router.get('/:id/messages', getMessages);
module.exports = router;
