import express from 'express';
import {
    createEducation,
    getEducations,
    getEducation,
    updateEducation,
    deleteEducation
} from '../controllers/educationController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/education:
 *   post:
 *     summary: Create education entry
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - degree
 *               - institution
 *               - field_of_study
 *               - start_date
 *             properties:
 *               degree:
 *                 type: string
 *                 example: Bachelor of Science
 *               institution:
 *                 type: string
 *                 example: University of Example
 *               field_of_study:
 *                 type: string
 *                 example: Computer Science
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: 2018-09-01
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: 2022-06-30
 *               is_current:
 *                 type: boolean
 *                 example: false
 *               description:
 *                 type: string
 *               highlights:
 *                 type: string
 *                 description: JSON string array
 *                 example: '["Dean\'s List","GPA 3.8"]'
 *               display_order:
 *                 type: number
 *               is_visible:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Education created successfully
 */
router.post('/', protect, createEducation);

/**
 * @swagger
 * /api/education:
 *   get:
 *     summary: Get all education entries
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Education entries retrieved successfully
 */
router.get('/', protect, getEducations);

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Get single education entry
 *     tags: [Education]
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
 *         description: Education entry retrieved successfully
 */
router.get('/:id', protect, getEducation);

/**
 * @swagger
 * /api/education/{id}:
 *   put:
 *     summary: Update education entry
 *     tags: [Education]
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
 *         description: Education updated successfully
 */
router.put('/:id', protect, updateEducation);

/**
 * @swagger
 * /api/education/{id}:
 *   delete:
 *     summary: Delete education entry
 *     tags: [Education]
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
 *         description: Education deleted successfully
 */
router.delete('/:id', protect, deleteEducation);

export default router;