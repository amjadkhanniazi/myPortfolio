import Education from '../models/education.js';

// Create Education
export const createEducation = async (req, res) => {
    try {
        const {
            degree,
            institution,
            field_of_study,
            start_date,
            end_date,
            is_current,
            description,
            highlights,
            display_order,
            is_visible
        } = req.body;

        const education = await Education.create({
            user_id: req.user.id,
            degree,
            institution,
            field_of_study,
            start_date,
            end_date: is_current ? null : end_date,
            is_current: is_current || false,
            description,
            highlights: highlights ? JSON.parse(highlights) : [],
            display_order: display_order || 0,
            is_visible: is_visible !== undefined ? is_visible : true
        });

        res.status(201).json({
            status: 'success',
            data: { education }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get All Education
export const getEducations = async (req, res) => {
    try {
        const educations = await Education.find({ user_id: req.user.id })
            .sort({ display_order: 1, start_date: -1 });

        res.status(200).json({
            status: 'success',
            results: educations.length,
            data: { educations }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get Single Education
export const getEducation = async (req, res) => {
    try {
        const education = await Education.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!education) {
            return res.status(404).json({
                status: 'error',
                message: 'Education not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { education }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update Education
export const updateEducation = async (req, res) => {
    try {
        const {
            degree,
            institution,
            field_of_study,
            start_date,
            end_date,
            is_current,
            description,
            highlights,
            display_order,
            is_visible
        } = req.body;

        const education = await Education.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!education) {
            return res.status(404).json({
                status: 'error',
                message: 'Education not found'
            });
        }

        const updatedEducation = await Education.findByIdAndUpdate(
            req.params.id,
            {
                degree,
                institution,
                field_of_study,
                start_date,
                end_date: is_current ? null : end_date,
                is_current,
                description,
                highlights: highlights ? JSON.parse(highlights) : education.highlights,
                display_order,
                is_visible,
                updated_at: Date.now()
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            data: { education: updatedEducation }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Education
export const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!education) {
            return res.status(404).json({
                status: 'error',
                message: 'Education not found'
            });
        }

        await Education.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Education deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};