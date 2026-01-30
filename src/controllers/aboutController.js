import About from '../models/about.js';

// Create About
export const createAbout = async (req, res) => {
    try {
        const { heading, subheading, description, highlights } = req.body;

        // Check if about already exists
        const existingAbout = await About.findOne({ user_id: req.user.id });
        if (existingAbout) {
            return res.status(400).json({
                status: 'error',
                message: 'About section already exists. Use update instead.'
            });
        }

        const about = await About.create({
            user_id: req.user.id,
            heading,
            subheading,
            description,
            highlights: highlights ? JSON.parse(highlights) : []
        });

        res.status(201).json({
            status: 'success',
            data: { about }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get About
export const getAbout = async (req, res) => {
    try {
        const about = await About.findOne({ user_id: req.user.id });
        if (!about) {
            return res.status(404).json({
                status: 'error',
                message: 'About section not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { about }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update About
export const updateAbout = async (req, res) => {
    try {
        const { heading, subheading, description, highlights } = req.body;

        const about = await About.findOneAndUpdate(
            { user_id: req.user.id },
            {
                heading,
                subheading,
                description,
                highlights: highlights ? JSON.parse(highlights) : undefined,
                updated_at: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!about) {
            return res.status(404).json({
                status: 'error',
                message: 'About section not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { about }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete About
export const deleteAbout = async (req, res) => {
    try {
        const about = await About.findOneAndDelete({ user_id: req.user.id });
        
        if (!about) {
            return res.status(404).json({
                status: 'error',
                message: 'About section not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'About section deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};