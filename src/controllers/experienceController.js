import Experience from '../models/experience.js';

// Create Experience
export const createExperience = async (req, res) => {
    try {
        const {
            position,
            company,
            location,
            start_date,
            end_date,
            is_current,
            description,
            responsibilities,
            technologies,
            display_order,
            is_visible
        } = req.body;

        const experience = await Experience.create({
            user_id: req.user.id,
            position,
            company,
            location,
            start_date,
            end_date: is_current ? null : end_date,
            is_current: is_current || false,
            description,
            responsibilities: responsibilities ? JSON.parse(responsibilities) : [],
            technologies: technologies ? JSON.parse(technologies) : [],
            display_order: display_order || 0,
            is_visible: is_visible !== undefined ? is_visible : true
        });

        res.status(201).json({
            status: 'success',
            data: { experience }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get All Experiences
export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find({ user_id: req.user.id })
            .sort({ display_order: 1, start_date: -1 });

        res.status(200).json({
            status: 'success',
            results: experiences.length,
            data: { experiences }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get Single Experience
export const getExperience = async (req, res) => {
    try {
        const experience = await Experience.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!experience) {
            return res.status(404).json({
                status: 'error',
                message: 'Experience not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { experience }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update Experience
export const updateExperience = async (req, res) => {
    try {
        const {
            position,
            company,
            location,
            start_date,
            end_date,
            is_current,
            description,
            responsibilities,
            technologies,
            display_order,
            is_visible
        } = req.body;

        const experience = await Experience.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!experience) {
            return res.status(404).json({
                status: 'error',
                message: 'Experience not found'
            });
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            {
                position,
                company,
                location,
                start_date,
                end_date: is_current ? null : end_date,
                is_current,
                description,
                responsibilities: responsibilities ? JSON.parse(responsibilities) : experience.responsibilities,
                technologies: technologies ? JSON.parse(technologies) : experience.technologies,
                display_order,
                is_visible,
                updated_at: Date.now()
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            data: { experience: updatedExperience }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Experience
export const deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!experience) {
            return res.status(404).json({
                status: 'error',
                message: 'Experience not found'
            });
        }

        await Experience.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Experience deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};