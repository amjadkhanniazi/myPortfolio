import express from 'express';
import {
    createSkill,
    getSkills,
    getSkill,
    updateSkill,
    deleteSkill,
    deleteSkillIcon
} from '../controllers/skillController.js';
import { protect } from '../middlewares/auth.js';
import { uploadProfileImgMiddleWare } from '../middlewares/upload.js';

const router = express.Router();

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - proficiency
 *             properties:
 *               name:
 *                 type: string
 *                 example: JavaScript
 *               category:
 *                 type: string
 *                 enum: [Frontend, Backend, Database, DevOps, Tools, Other]
 *                 example: Frontend
 *               proficiency:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 example: 85
 *               icon_url:
 *                 type: string
 *                 format: binary
 *               display_order:
 *                 type: number
 *                 example: 1
 *               is_visible:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Skill created successfully
 */
router.post('/', protect, uploadProfileImgMiddleWare.single('icon_url'), createSkill);

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Skills retrieved successfully
 */
router.get('/', protect, getSkills);

/**
 * @swagger
 * /api/skills/{id}:
 *   get:
 *     summary: Get single skill
 *     tags: [Skills]
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
 *         description: Skill retrieved successfully
 *       404:
 *         description: Skill not found
 */
router.get('/:id', protect, getSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Update skill
 *     tags: [Skills]
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
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               proficiency:
 *                 type: number
 *               icon_url:
 *                 type: string
 *                 format: binary
 *               display_order:
 *                 type: number
 *               is_visible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Skill updated successfully
 */
router.put('/:id', protect, uploadProfileImgMiddleWare.single('icon_url'), updateSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     summary: Delete skill
 *     tags: [Skills]
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
 *         description: Skill deleted successfully
 */
router.delete('/:id', protect, deleteSkill);

/**
 * @swagger
 * /api/skills/{id}/icon:
 *   delete:
 *     summary: Delete skill icon
 *     tags: [Skills]
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
 *         description: Skill icon deleted successfully
 */
router.delete('/:id/icon', protect, deleteSkillIcon);

export default router;