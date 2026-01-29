import {createProfile, getProfile, updateProfile, deleteProfile, deleteProfileImage, uploadProfileImage} from '../controllers/profileController.js';
import express from 'express';
import {protect} from '../middlewares/auth.js';
import {uploadProfileImgMiddleWare, uploadCVMiddleWare} from '../middlewares/upload.js';
import {uploadCV, deleteCV, downloadCV} from '../controllers/profileController.js';


const router = express.Router();

router.post('/profile',protect, uploadProfileImgMiddleWare.single('profile_image_url'),createProfile)
router.get('/profile',protect,getProfile)
router.put('/profile',protect,updateProfile)
router.delete('/profile',protect,deleteProfile)

// Profile Image Management
router.delete('/profile/delimg',protect,deleteProfileImage)
router.post('/profile/newimg',protect,uploadProfileImgMiddleWare.single('profile_image_url'),uploadProfileImage)

// CV Management
router.post('/upload-cv',protect, uploadCVMiddleWare.single('cv_url'), uploadCV);
router.delete('/cv',protect, deleteCV);
router.get('/download-cv',protect, downloadCV);

export default router;