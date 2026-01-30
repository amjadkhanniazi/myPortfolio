import express from 'express';
import {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    deleteProjectImage
} from '../controllers/projectController.js';
import { protect } from '../middlewares/auth.js';
import { uploadProfileImgMiddleWare } from '../middlewares/upload.js';

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: E-commerce Platform
 *               description:
 *                 type: string
 *                 example: A full-featured e-commerce platform
 *               category:
 *                 type: string
 *                 example: Web Application
 *               tags:
 *                 type: string
 *                 description: JSON string array
 *                 example: '["React","Node.js","MongoDB"]'
 *               image_url:
 *                 type: string
 *                 format: binary
 *               github_url:
 *                 type: string
 *                 example: https://github.com/user/project
 *               live_url:
 *                 type: string
 *                 example: https://project.com
 *               status:
 *                 type: string
 *                 enum: [In Progress, Completed, Archived]
 *                 example: Completed
 *               display_order:
 *                 type: number
 *               is_featured:
 *                 type: boolean
 *               is_visible:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post('/', protect, uploadProfileImgMiddleWare.single('image_url'), createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: is_featured
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 */
router.get('/', protect, getProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get single project
 *     tags: [Projects]
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
 *         description: Project retrieved successfully
 */
router.get('/:id', protect, getProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: string
 *               image_url:
 *                 type: string
 *                 format: binary
 *               github_url:
 *                 type: string
 *               live_url:
 *                 type: string
 *               status:
 *                 type: string
 *               display_order:
 *                 type: number
 *               is_featured:
 *                 type: boolean
 *               is_visible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Project updated successfully
 */
router.put('/:id', protect, uploadProfileImgMiddleWare.single('image_url'), updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
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
 *         description: Project deleted successfully
 */
router.delete('/:id', protect, deleteProject);

/**
 * @swagger
 * /api/projects/{id}/image:
 *   delete:
 *     summary: Delete project image
 *     tags: [Projects]
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
 *         description: Project image deleted successfully
 */
router.delete('/:id/image', protect, deleteProjectImage);

export default router;