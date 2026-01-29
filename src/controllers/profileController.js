// import Profile from '../models/profile.js';
// import fs from 'fs';
// import path from 'path';

// // Helper function to delete old profile image
// const deleteOldImage = (imageUrl) => {
//     if (imageUrl) {
//         const filename = imageUrl.split('/').pop();
//         const filepath = path.join('./uploads/profiles', filename);
//         if (fs.existsSync(filepath)) {
//             fs.unlinkSync(filepath);
//         }
//     }
// };

// // Helper function to delete old CV
// const deleteOldCV = (cvUrl) => {
//     if (cvUrl) {
//         const filename = cvUrl.split('/').pop();
//         const filepath = path.join(process.cwd(), 'uploads', 'cvs', filename);
//         if (fs.existsSync(filepath)) {
//             fs.unlinkSync(filepath);
//         }
//     }
// };

// export const createProfile = async (req, res) => {
//     try {
//         const { full_name, title, tagline, location, phone, social_links } = req.body;
        
//         // Get profile image URL if file was uploaded
//         const profile_image_url = req.file 
//             ? `/uploads/profiles/${req.file.filename}` 
//             : null;
        
//         // Parse social_links if it's a string, otherwise use as-is
//         let parsedSocialLinks = [];
//         if (social_links) {
//             parsedSocialLinks = typeof social_links === 'string' 
//                 ? JSON.parse(social_links) 
//                 : social_links;
//         }

//         const profile = await Profile.create({
//             user_id: req.user.id,
//             full_name,
//             title,
//             tagline,
//             location,
//             phone,
//             profile_image_url,
//             social_links: parsedSocialLinks
//         });

//         res.status(201).json({
//             status: 'success',
//             data: {
//                 profile
//             }
//         });
//     } catch (error) {
//         // Delete uploaded file if profile creation fails
//         if (req.file) {
//             fs.unlinkSync(req.file.path);
//         }
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// export const getProfile = async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ user_id: req.user.id });
//         if (!profile) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Profile not found'
//             });
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 profile
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// export const updateProfile = async (req, res) => {
//     try {
//         const {
//             full_name,
//             title,
//             tagline,
//             location,
//             phone,
//             social_links
//         } = req.body;

//         // Find existing profile
//         const existingProfile = await Profile.findOne({ user_id: req.user.id });
//         if (!existingProfile) {
//             // Delete uploaded file if profile doesn't exist
//             if (req.file) {
//                 fs.unlinkSync(req.file.path);
//             }
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Profile not found'
//             });
//         }

//         // Prepare update data
//         const updateData = {
//             full_name,
//             title,
//             tagline,
//             location,
//             phone,
//             social_links: social_links ? JSON.parse(social_links) : existingProfile.social_links,
//             updated_at: Date.now()
//         };

//         // Handle profile image update
//         if (req.file) {
//             // Delete old image if exists
//             deleteOldImage(existingProfile.profile_image_url);
//             // Set new image URL
//             updateData.profile_image_url = `/uploads/profiles/${req.file.filename}`;
//         }

//         const profile = await Profile.findOneAndUpdate(
//             { user_id: req.user.id },
//             updateData,
//             { new: true }
//         );

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 profile
//             }
//         });
//     } catch (error) {
//         // Delete uploaded file if update fails
//         if (req.file) {
//             fs.unlinkSync(req.file.path);
//         }
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// export const deleteProfile = async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ user_id: req.user.id });
//         if (!profile) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Profile not found'
//             });
//         }

//         // Delete profile image if exists
//         deleteOldImage(profile.profile_image_url);

//         await Profile.findOneAndDelete({ user_id: req.user.id });

//         res.status(200).json({
//             status: 'success',
//             message: 'Profile deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// // Endpoint to delete only profile picture
// export const deleteProfileImage = async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ user_id: req.user.id });
//         if (!profile) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Profile not found'
//             });
//         }

//         // Delete the image file
//         deleteOldImage(profile.profile_image_url);

//         // Update profile to remove image URL
//         profile.profile_image_url = null;
//         profile.updated_at = Date.now();
//         await profile.save();

//         res.status(200).json({
//             status: 'success',
//             message: 'Profile image deleted successfully',
//             data: {
//                 profile
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// // Upload or change profile image only
// export const uploadProfileImage = async (req, res) => {
//     try {
//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Please upload an image file'
//             });
//         }

//         // Find existing profile
//         const profile = await Profile.findOne({ user_id: req.user.id });
//         if (!profile) {
//             // Delete uploaded file if profile doesn't exist
//             fs.unlinkSync(req.file.path);
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Profile not found. Please create a profile first.'
//             });
//         }

//         // Delete old profile image if exists
//         if (profile.profile_image_url) {
//             deleteOldImage(profile.profile_image_url);
//         }

//         // Update profile with new image URL
//         profile.profile_image_url = `/uploads/profiles/${req.file.filename}`;
//         profile.updated_at = Date.now();
//         await profile.save();

//         res.status(200).json({
//             status: 'success',
//             message: 'Profile image uploaded successfully',
//             data: {
//                 profile_image_url: profile.profile_image_url,
//                 profile
//             }
//         });
//     } catch (error) {
//         // Delete uploaded file if update fails
//         if (req.file) {
//             fs.unlinkSync(req.file.path);
//         }
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// // CV Management
// // Upload or change CV only
// export const uploadCV = async (req, res) => {
//     try {
//         // Check if file was uploaded
//         if (!req.file) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Please upload a PDF file'
//             });
//         }

//         // Find existing profile
//         const profile = await Profile.findOne({ user_id: req.user.id });
//         if (!profile) {
//             // Delete uploaded file if profile doesn't exist
//             fs.unlinkSync(req.file.path);
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Profile not found. Please create a profile first.'
//             });
//         }

//         // Delete old CV if exists
//         if (profile.cv_url) {
//             deleteOldCV(profile.cv_url);
//         }

//         // Update profile with new CV URL
//         profile.cv_url = `/uploads/cvs/${req.file.filename}`;
//         profile.updated_at = Date.now();
//         await profile.save();

//         res.status(200).json({
//             status: 'success',
//             message: 'CV uploaded successfully',
//             data: {
//                 cv_url: profile.cv_url,
//                 cv_filename: req.file.originalname,
//                 profile
//             }
//         });
//     } catch (error) {
//         // Delete uploaded file if update fails
//         if (req.file) {
//             fs.unlinkSync(req.file.path);
//         }
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// // Delete CV only
// export const deleteCV = async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ user_id: req.user.id });
//         if (!profile) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Profile not found'
//             });
//         }

//         if (!profile.cv_url) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'No CV found to delete'
//             });
//         }

//         // Delete the CV file
//         deleteOldCV(profile.cv_url);

//         // Update profile to remove CV URL
//         profile.cv_url = null;
//         profile.updated_at = Date.now();
//         await profile.save();

//         res.status(200).json({
//             status: 'success',
//             message: 'CV deleted successfully',
//             data: {
//                 profile
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };

// // Get CV file (for download)
// export const downloadCV = async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ user_id: req.user.id });
//         if (!profile) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Profile not found'
//             });
//         }

//         if (!profile.cv_url) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'No CV found'
//             });
//         }

//         const filename = profile.cv_url.split('/').pop();
//         const filepath = path.join(process.cwd(), 'uploads', 'cvs', filename);

//         if (!fs.existsSync(filepath)) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'CV file not found on server'
//             });
//         }

//         // Set headers for download
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename="${profile.full_name}_CV.pdf"`);
        
//         // Stream the file
//         const fileStream = fs.createReadStream(filepath);
//         fileStream.pipe(res);
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: error.message
//         });
//     }
// };


import Profile from '../models/profile.js';
import { uploadToBlob, deleteFromBlob } from '../utils/blobStorage.js';

// Helper to generate unique filename
const generateFilename = (userId, originalName) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const ext = originalName.split('.').pop();
    return `${userId}_${timestamp}_${random}.${ext}`;
};

// Create Profile with Image
export const createProfile = async (req, res) => {
    try {
        const { full_name, title, tagline, location, phone, social_links } = req.body;
        
        let profile_image_url = null;
        let cv_url = null;

        // Handle CV upload
        
        // Upload image to Vercel Blob if file exists
        if (req.file) {
            const filename = generateFilename(req.user.id, req.file.originalname);
            const result = await uploadToBlob(req.file.buffer, filename, 'profiles');
            profile_image_url = result.url;
        }

        const profile = await Profile.create({
            user_id: req.user.id,
            full_name,
            title,
            tagline,
            location,
            phone,
            profile_image_url,
            cv_url,
            social_links: social_links ? JSON.parse(social_links) : []
        });

        res.status(201).json({
            status: 'success',
            data: { profile }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get Profile
export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user_id: req.user.id });
        if (!profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { profile }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { full_name, title, tagline, location, phone, social_links } = req.body;

        const existingProfile = await Profile.findOne({ user_id: req.user.id });
        if (!existingProfile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            });
        }

        const updateData = {
            full_name,
            title,
            tagline,
            location,
            phone,
            social_links: social_links ? JSON.parse(social_links) : existingProfile.social_links,
            updated_at: Date.now()
        };

        // Handle image update
        if (req.file) {
            // Delete old image from Blob
            if (existingProfile.profile_image_url) {
                await deleteFromBlob(existingProfile.profile_image_url);
            }
            
            // Upload new image
            const filename = generateFilename(req.user.id, req.file.originalname);
            const result = await uploadToBlob(req.file.buffer, filename, 'profiles');
            updateData.profile_image_url = result.url;
        }

        const profile = await Profile.findOneAndUpdate(
            { user_id: req.user.id },
            updateData,
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            data: { profile }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Profile
export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user_id: req.user.id });
        if (!profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            });
        }

        // Delete files from Blob
        if (profile.profile_image_url) {
            await deleteFromBlob(profile.profile_image_url);
        }
        if (profile.cv_url) {
            await deleteFromBlob(profile.cv_url);
        }

        await Profile.findOneAndDelete({ user_id: req.user.id });

        res.status(200).json({
            status: 'success',
            message: 'Profile deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Upload Profile Image Only
export const uploadProfileImage = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'Please upload an image file'
            });
        }

        const profile = await Profile.findOne({ user_id: req.user.id });
        if (!profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found. Please create a profile first.'
            });
        }

        // Delete old image
        if (profile.profile_image_url) {
            await deleteFromBlob(profile.profile_image_url);
        }

        // Upload new image
        const filename = generateFilename(req.user.id, req.file.originalname);
        const result = await uploadToBlob(req.file.buffer, filename, 'profiles');

        profile.profile_image_url = result.url;
        profile.updated_at = Date.now();
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'Profile image uploaded successfully',
            data: {
                profile_image_url: profile.profile_image_url,
                profile
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Profile Image Only
export const deleteProfileImage = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user_id: req.user.id });
        if (!profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            });
        }

        if (!profile.profile_image_url) {
            return res.status(404).json({
                status: 'error',
                message: 'No profile image found'
            });
        }

        await deleteFromBlob(profile.profile_image_url);

        profile.profile_image_url = null;
        profile.updated_at = Date.now();
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'Profile image deleted successfully',
            data: { profile }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Upload CV
export const uploadCV = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                status: 'error',
                message: 'Authentication required'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'Please upload a PDF file'
            });
        }

        const profile = await Profile.findOne({ user_id: req.user.id });
        if (!profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found. Please create a profile first.'
            });
        }

        // Delete old CV
        if (profile.cv_url) {
            await deleteFromBlob(profile.cv_url);
        }

        // Upload new CV
        const filename = `cv_${generateFilename(req.user.id, req.file.originalname)}`;
        const result = await uploadToBlob(req.file.buffer, filename, 'cvs');

        profile.cv_url = result.url;
        profile.updated_at = Date.now();
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'CV uploaded successfully',
            data: {
                cv_url: profile.cv_url,
                profile
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete CV
export const deleteCV = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user_id: req.user.id });
        if (!profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            });
        }

        if (!profile.cv_url) {
            return res.status(404).json({
                status: 'error',
                message: 'No CV found to delete'
            });
        }

        await deleteFromBlob(profile.cv_url);

        profile.cv_url = null;
        profile.updated_at = Date.now();
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'CV deleted successfully',
            data: { profile }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Download CV
export const downloadCV = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user_id: req.user.id });
        if (!profile || !profile.cv_url) {
            return res.status(404).json({
                status: 'error',
                message: 'CV not found'
            });
        }

        // Redirect to the Blob URL for download
        res.redirect(profile.cv_url);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
