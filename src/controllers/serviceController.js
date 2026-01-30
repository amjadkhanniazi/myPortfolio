import Service from '../models/service.js';

// Create Service
export const createService = async (req, res) => {
    try {
        const { title, description, icon_name, display_order, is_visible } = req.body;

        const service = await Service.create({
            user_id: req.user.id,
            title,
            description,
            icon_name,
            display_order: display_order || 0,
            is_visible: is_visible !== undefined ? is_visible : true
        });

        res.status(201).json({
            status: 'success',
            data: { service }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get All Services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find({ user_id: req.user.id })
            .sort({ display_order: 1 });

        res.status(200).json({
            status: 'success',
            results: services.length,
            data: { services }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get Single Service
export const getService = async (req, res) => {
    try {
        const service = await Service.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { service }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update Service
export const updateService = async (req, res) => {
    try {
        const { title, description, icon_name, display_order, is_visible } = req.body;

        const service = await Service.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                icon_name,
                display_order,
                is_visible,
                updated_at: Date.now()
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            data: { service: updatedService }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Service
export const deleteService = async (req, res) => {
    try {
        const service = await Service.findOne({
            _id: req.params.id,
            user_id: req.user.id
        });

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        await Service.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};