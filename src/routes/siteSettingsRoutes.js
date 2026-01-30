import express from 'express';
import {
  getOrCreateSettings,
  updateSettings,
  uploadLogo,
  uploadFavicon,
  deleteLogo,
  deleteFavicon
} from '../controllers/siteSettingsController.js';
import { protect } from '../middlewares/auth.js';
import { uploadProfileImgMiddleWare } from '../middlewares/upload.js';

const router = express.Router();

/**
 * @swagger
 * /api/site-settings:
 *   get:
 *     summary: Get or create default site settings
 *     tags: [Site Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Site settings retrieved or created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     settings:
 *                       type: object
 *                       description: Site settings object
 */
router.get('/', protect, getOrCreateSettings);

/**
 * @swagger
 * /api/site-settings:
 *   put:
 *     summary: Update site settings
 *     tags: [Site Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Site settings object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               site_title:
 *                 type: string
 *                 example: My Portfolio
 *               site_description:
 *                 type: string
 *                 example: Personal portfolio website
 *               theme_settings:
 *                 type: object
 *                 example: { "primary_color": "#3B82F6", "dark_mode": false }
 *               seo_settings:
 *                 type: object
 *                 example: { "meta_keywords": ["portfolio", "developer"], "meta_description": "Portfolio site" }
 *               analytics_settings:
 *                 type: object
 *                 example: { "google_analytics_id": "UA-XXXXXX" }
 *               maintenance_mode:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Site settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     settings:
 *                       type: object
 */
router.put('/', protect, updateSettings);

/**
 * @swagger
 * /api/site-settings/logo:
 *   post:
 *     summary: Upload site logo image
 *     tags: [Site Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Logo image file upload (JPEG, PNG, etc.)
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - logo
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Logo uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     settings:
 *                       type: object
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 */
router.post('/logo', protect, uploadProfileImgMiddleWare.single('logo'), uploadLogo);

/**
 * @swagger
 * /api/site-settings/favicon:
 *   post:
 *     summary: Upload site favicon image
 *     tags: [Site Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Favicon image file upload (ICO, PNG, etc.)
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - favicon
 *             properties:
 *               favicon:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Favicon uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Favicon uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     settings:
 *                       type: object
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 */
router.post('/favicon', protect, uploadProfileImgMiddleWare.single('favicon'), uploadFavicon);

/**
 * @swagger
 * /api/site-settings/logo:
 *   delete:
 *     summary: Delete site logo image
 *     tags: [Site Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logo deleted successfully
 *       404:
 *         description: Logo not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/logo', protect, deleteLogo);

/**
 * @swagger
 * /api/site-settings/favicon:
 *   delete:
 *     summary: Delete site favicon image
 *     tags: [Site Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favicon deleted successfully
 *       404:
 *         description: Favicon not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/favicon', protect, deleteFavicon);

export default router;