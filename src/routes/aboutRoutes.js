import express from 'express';
import {
    createAbout,
    getAbout,
    updateAbout,
    deleteAbout
} from '../controllers/aboutController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/about:
 *   post:
 *     summary: Create about section
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - heading
 *               - subheading
 *               - description
 *             properties:
 *               heading:
 *                 type: string
 *                 example: About Me
 *               subheading:
 *                 type: string
 *                 example: Full Stack Developer
 *               description:
 *                 type: string
 *                 example: I am a passionate developer...
 *               highlights:
 *                 type: string
 *                 description: JSON string array
 *                 example: '["5+ years experience","50+ projects","10+ awards"]'
 *     responses:
 *       201:
 *         description: About section created successfully
 *       400:
 *         description: About section already exists
 *       401:
 *         description: Unauthorized
 */
router.post('/', protect, createAbout);

/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get about section
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: About section retrieved successfully
 *       404:
 *         description: About section not found
 */
router.get('/', protect, getAbout);

/**
 * @swagger
 * /api/about:
 *   put:
 *     summary: Update about section
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               heading:
 *                 type: string
 *               subheading:
 *                 type: string
 *               description:
 *                 type: string
 *               highlights:
 *                 type: string
 *     responses:
 *       200:
 *         description: About section updated successfully
 *       404:
 *         description: About section not found
 */
router.put('/', protect, updateAbout);

/**
 * @swagger
 * /api/about:
 *   delete:
 *     summary: Delete about section
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: About section deleted successfully
 *       404:
 *         description: About section not found
 */
router.delete('/', protect, deleteAbout);

export default router;