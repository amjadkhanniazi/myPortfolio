import express from 'express';
import {
    createExperience,
    getExperiences,
    getExperience,
    updateExperience,
    deleteExperience
} from '../controllers/experienceController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/experience:
 *   post:
 *     summary: Create experience entry
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - position
 *               - company
 *               - location
 *               - start_date
 *             properties:
 *               position:
 *                 type: string
 *                 example: Senior Developer
 *               company:
 *                 type: string
 *                 example: Tech Corp
 *               location:
 *                 type: string
 *                 example: New York, USA
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               is_current:
 *                 type: boolean
 *               description:
 *                 type: string
 *               responsibilities:
 *                 type: string
 *                 description: JSON string array
 *               technologies:
 *                 type: string
 *                 description: JSON string array
 *               display_order:
 *                 type: number
 *               is_visible:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Experience created successfully
 */
router.post('/', protect, createExperience);

/**
 * @swagger
 * /api/experience:
 *   get:
 *     summary: Get all experience entries
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Experience entries retrieved successfully
 */
router.get('/', protect, getExperiences);

/**
 * @swagger
 * /api/experience/{id}:
 *   get:
 *     summary: Get single experience entry
 *     tags: [Experience]
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
 *         description: Experience entry retrieved successfully
 */
router.get('/:id', protect, getExperience);

/**
 * @swagger
 * /api/experience/{id}:
 *   put:
 *     summary: Update experience entry
 *     tags: [Experience]
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
 *     responses:
 *       200:
 *         description: Experience updated successfully
 */
router.put('/:id', protect, updateExperience);

/**
 * @swagger
 * /api/experience/{id}:
 *   delete:
 *     summary: Delete experience entry
 *     tags: [Experience]
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
 *         description: Experience deleted successfully
 */
router.delete('/:id', protect, deleteExperience);

export default router;