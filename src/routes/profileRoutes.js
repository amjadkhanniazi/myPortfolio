import {createProfile, getProfile, updateProfile, deleteProfile, deleteProfileImage, uploadProfileImage} from '../controllers/profileController.js';
import express from 'express';
import {protect} from '../middlewares/auth.js';
import {uploadProfileImgMiddleWare, uploadCVMiddleWare} from '../middlewares/upload.js';
import {uploadCV, deleteCV, downloadCV} from '../controllers/profileController.js';

const router = express.Router();

/**
 * @swagger
 * /api/profile/profile:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - title
 *               - tagline
 *               - location
 *               - phone
 *             properties:
 *               full_name:
 *                 type: string
 *                 minLength: 3
 *                 example: John Doe
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 example: Full Stack Developer
 *               tagline:
 *                 type: string
 *                 minLength: 3
 *                 example: Building amazing web applications
 *               location:
 *                 type: string
 *                 minLength: 3
 *                 example: New York, USA
 *               phone:
 *                 type: string
 *                 minLength: 3
 *                 example: +1234567890
 *               profile_image_url:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file (JPEG, PNG, etc.)
 *               social_links:
 *                 type: string
 *                 description: JSON string of social links array
 *                 example: '[{"platform":"LinkedIn","url":"https://linkedin.com/in/johndoe"},{"platform":"GitHub","url":"https://github.com/johndoe"}]'
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/profile', protect, uploadProfileImgMiddleWare.single('profile_image_url'), createProfile);

/**
 * @swagger
 * /api/profile/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
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
 *                     profile:
 *                       type: object
 *                       properties:
 *                         user_id:
 *                           type: string
 *                         full_name:
 *                           type: string
 *                         title:
 *                           type: string
 *                         tagline:
 *                           type: string
 *                         location:
 *                           type: string
 *                         phone:
 *                           type: string
 *                         profile_image_url:
 *                           type: string
 *                         cv_url:
 *                           type: string
 *                         social_links:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               platform:
 *                                 type: string
 *                               url:
 *                                 type: string
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                         updated_at:
 *                           type: string
 *                           format: date-time
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.get('/profile', protect, getProfile);

/**
 * @swagger
 * /api/profile/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *               title:
 *                 type: string
 *                 example: Senior Full Stack Developer
 *               tagline:
 *                 type: string
 *                 example: Building scalable applications
 *               location:
 *                 type: string
 *                 example: San Francisco, USA
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               profile_image_url:
 *                 type: string
 *                 format: binary
 *                 description: New profile image file
 *               social_links:
 *                 type: string
 *                 description: JSON string of social links array
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.put('/profile', protect, updateProfile);

/**
 * @swagger
 * /api/profile/profile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.delete('/profile', protect, deleteProfile);

/**
 * @swagger
 * /api/profile/profile/delimg:
 *   delete:
 *     summary: Delete profile image only
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile image deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile or image not found
 *       500:
 *         description: Server error
 */
router.delete('/profile/delimg', protect, deleteProfileImage);

/**
 * @swagger
 * /api/profile/profile/newimg:
 *   post:
 *     summary: Upload or change profile image
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profile_image_url
 *             properties:
 *               profile_image_url:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file (JPEG, PNG, etc.)
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.post('/profile/newimg', protect, uploadProfileImgMiddleWare.single('profile_image_url'), uploadProfileImage);

/**
 * @swagger
 * /api/profile/upload-cv:
 *   post:
 *     summary: Upload or change CV
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - cv_url
 *             properties:
 *               cv_url:
 *                 type: string
 *                 format: binary
 *                 description: CV file (PDF only)
 *     responses:
 *       200:
 *         description: CV uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file type
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
router.post('/upload-cv', protect, uploadCVMiddleWare.single('cv_url'), uploadCV);

/**
 * @swagger
 * /api/profile/cv:
 *   delete:
 *     summary: Delete CV
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CV deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile or CV not found
 *       500:
 *         description: Server error
 */
router.delete('/cv', protect, deleteCV);

/**
 * @swagger
 * /api/profile/download-cv:
 *   get:
 *     summary: Download CV
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CV file redirect
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: CV not found
 *       500:
 *         description: Server error
 */
router.get('/download-cv', protect, downloadCV);

export default router;