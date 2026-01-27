import {createProfile, getProfile, updateProfile, deleteProfile} from './profileController.js';
import express from 'express';
import {process} from '../middlewares/auth.js';


const router = express.Router();

router.post('/profile',process,createProfile)
router.get('/profile',process,getProfile)
router.put('/profile',process,updateProfile)
router.delete('/profile',process,deleteProfile)



export default router;