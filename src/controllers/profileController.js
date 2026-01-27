import Profile from '../models/profile.js';

export const createProfile = async (req, res) => {
    try {
        const {full_name, title, tagline, location, phone, profile_image_url, cv_url, social_links} = req.body;
        const profile = await Profile.create({
            user_id: req.user.id,
            full_name,
            title,
            tagline,
            location,
            phone,
            profile_image_url,
            cv_url,
            social_links
        })
        res.status(201).json({
            status: 'success',
            data: {
                profile
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({user_id: req.user.id});
        if (!profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                profile
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {
            full_name,
            title,
            tagline,
            location,
            phone,
            profile_image_url,
            cv_url,
            social_links
        } = req.body;
        const profile = await Profile.findOneAndUpdate({user_id: req.user.id}, {
            full_name,
            title,
            tagline,
            location,
            phone,
            profile_image_url,
            cv_url,
            social_links
            }, {new: true});
            if (!profile) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Profile not found'
                })
            }
            res.status(200).json({
                status: 'success',
                data: {
                    profile
                }
            })
        } catch(error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            })
        }
        }

        
export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({user_id: req.user.id});
        if (!profile) {
            return res.status(404).json({
                status: 'error',
                message: 'Profile not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Profile deleted successfully'
        })
            } catch (error) {
                res.status(500).json({       
                    status: 'error',
                    message: error.message
                })
            }
}