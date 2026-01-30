import express from 'express';
import {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact,
  getContactStats
} from '../controllers/contactController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a contact message
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               subject:
 *                 type: string
 *                 example: Inquiry about services
 *               message:
 *                 type: string
 *                 example: Could you provide more details about your services?
 *     responses:
 *       201:
 *         description: Contact message created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contact messages (Admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contact messages
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', protect, getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact message by ID (Admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact message details
 *       404:
 *         description: Contact message not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:id', protect, getContact);

/**
 * @swagger
 * /api/contacts/{id}/status:
 *   put:
 *     summary: Update the status of a contact message (Admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [unread, read, replied, archived]
 *                 example: read
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: Contact message not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/:id/status', protect, updateContactStatus);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact message (Admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact message deleted successfully
 *       404:
 *         description: Contact message not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', protect, deleteContact);

/**
 * @swagger
 * /api/contacts/stats:
 *   get:
 *     summary: Get contact message statistics (Admin only)
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact statistics
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/stats', protect, getContactStats);

export default router;