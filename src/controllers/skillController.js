import Skill from '../models/skill.js';
import { uploadToBlob, deleteFromBlob } from '../utils/blobStorage.js';

// Helper to generate unique filename
const generateFilename = (userId, originalName) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const ext = originalName.split('.').pop();
    return `skill_${userId}_${timestamp}_${random}.${ext}`;
};

// Create Skill
export const createSkill = async (req, res) => {
    try {
        const { name, category, proficiency, display_order, is_visible } = req.body;

        let icon_url = null;
        if (req.file) {
            const filename = generateFilename(req.user.id, req.file.originalname);
            const result = await uploadToBlob(req.file.buffer, filename, 'skills');
            icon_url = result.url;
        }

        const skill = await Skill.create({
            user_id: req.user.id,
            name,
            category,
            proficiency,
            icon_url,
            display_order: display_order || 0,
            is_visible: is_visible !== undefined ? is_visible : true
        });

        res.status(201).json({
            status: 'success',
            data: { skill }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get All Skills
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ user_id: req.user.id }).sort({ display_order: 1 });

        res.status(200).json({
            status: 'success',
            results: skills.length,
            data: { skills }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get Single Skill
export const getSkill = async (req, res) => {
    try {
        const skill = await Skill.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!skill) {
            return res.status(404).json({
                status: 'error',
                message: 'Skill not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { skill }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update Skill
export const updateSkill = async (req, res) => {
    try {
        const { name, category, proficiency, display_order, is_visible } = req.body;

        const skill = await Skill.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!skill) {
            return res.status(404).json({
                status: 'error',
                message: 'Skill not found'
            });
        }

        const updateData = {
            name,
            category,
            proficiency,
            display_order,
            is_visible,
            updated_at: Date.now()
        };

        // Handle icon update
        if (req.file) {
            if (skill.icon_url) {
                await deleteFromBlob(skill.icon_url);
            }
            const filename = generateFilename(req.user.id, req.file.originalname);
            const result = await uploadToBlob(req.file.buffer, filename, 'skills');
            updateData.icon_url = result.url;
        }

        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            data: { skill: updatedSkill }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Skill
export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!skill) {
            return res.status(404).json({
                status: 'error',
                message: 'Skill not found'
            });
        }

        if (skill.icon_url) {
            await deleteFromBlob(skill.icon_url);
        }

        await Skill.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Skill deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Skill Icon
export const deleteSkillIcon = async (req, res) => {
    try {
        const skill = await Skill.findOne({ 
            _id: req.params.id, 
            user_id: req.user.id 
        });

        if (!skill) {
            return res.status(404).json({
                status: 'error',
                message: 'Skill not found'
            });
        }

        if (!skill.icon_url) {
            return res.status(404).json({
                status: 'error',
                message: 'No icon found'
            });
        }

        await deleteFromBlob(skill.icon_url);

        skill.icon_url = null;
        skill.updated_at = Date.now();
        await skill.save();

        res.status(200).json({
            status: 'success',
            message: 'Skill icon deleted successfully',
            data: { skill }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};