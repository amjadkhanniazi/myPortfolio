import Project from '../models/project.js';
import { uploadToBlob, deleteFromBlob } from '../utils/blobStorage.js';

// Helper to generate unique filename
const generateFilename = (userId, originalName) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const ext = originalName.split('.').pop();
    return `project_${userId}_${timestamp}_${random}.${ext}`;
};

// Create Project
export const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            tags,
            github_url,
            live_url,
            status,
            display_order,
            is_featured,
            is_visible
        } = req.body;

        let image_url = null;
        if (req.file) {
            const filename = generateFilename(req.user.id, req.file.originalname);
            const result = await uploadToBlob(req.file.buffer, filename, 'projects');
            image_url = result.url;
        }

        const project = await Project.create({
            user_id: req.user.id,
            title,
            description,
            category,
            tags: tags ? JSON.parse(tags) : [],
            image_url,
            github_url,
            live_url,
            status: status || 'In Progress',
            display_order: display_order || 0,
            is_featured: is_featured || false,
            is_visible: is_visible !== undefined ? is_visible : true
        });

        res.status(201).json({
            status: 'success',
            data: { project }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get All Projects
export const getProjects = async (req, res) => {
    try {
        const { category, status, is_featured } = req.query;
        
        const filter = { user_id: req.user.id };
        if (category) filter.category = category;
        if (status) filter.status = status;
        if (is_featured !== undefined) filter.is_featured = is_featured === 'true';

        const projects = await Project.find(filter).sort({ display_order: 1, created_at: -1 });

        res.status(200).json({
            status: 'success',
            results: projects.length,
            data: { projects }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get Single Project
export const getProject = async (req, res) => {
    try {
        const project = await Project.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!project) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { project }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update Project
export const updateProject = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            tags,
            github_url,
            live_url,
            status,
            display_order,
            is_featured,
            is_visible
        } = req.body;

        const project = await Project.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!project) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found'
            });
        }

        const updateData = {
            title,
            description,
            category,
            tags: tags ? JSON.parse(tags) : project.tags,
            github_url,
            live_url,
            status,
            display_order,
            is_featured,
            is_visible,
            updated_at: Date.now()
        };

        // Handle image update
        if (req.file) {
            if (project.image_url) {
                await deleteFromBlob(project.image_url);
            }
            const filename = generateFilename(req.user.id, req.file.originalname);
            const result = await uploadToBlob(req.file.buffer, filename, 'projects');
            updateData.image_url = result.url;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            data: { project: updatedProject }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Project
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!project) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found'
            });
        }

        if (project.image_url) {
            await deleteFromBlob(project.image_url);
        }

        await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Project deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Project Image
export const deleteProjectImage = async (req, res) => {
    try {
        const project = await Project.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!project) {
            return res.status(404).json({
                status: 'error',
                message: 'Project not found'
            });
        }

        if (!project.image_url) {
            return res.status(404).json({
                status: 'error',
                message: 'No image found'
            });
        }

        await deleteFromBlob(project.image_url);

        project.image_url = null;
        project.updated_at = Date.now();
        await project.save();

        res.status(200).json({
            status: 'success',
            message: 'Project image deleted successfully',
            data: { project }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};