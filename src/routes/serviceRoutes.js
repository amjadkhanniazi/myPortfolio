import express from 'express';
import {
  createService,
  getServices,
  getService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
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
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Web Development
 *               description:
 *                 type: string
 *                 example: I specialize in creating modern and scalable web applications.
 *               icon_name:
 *                 type: string
 *                 example: code
 *               display_order:
 *                 type: number
 *                 example: 1
 *               is_visible:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', protect, createService);

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of services
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', protect, getServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a single service by ID
 *     tags: [Services]
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
 *         description: Service details
 *       404:
 *         description: Service not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:id', protect, getService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags: [Services]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               icon_name:
 *                 type: string
 *               display_order:
 *                 type: number
 *               is_visible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/:id', protect, updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Services]
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
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', protect, deleteService);

export default router;