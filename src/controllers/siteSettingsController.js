import SiteSettings from '../models/siteSettings.js';
import { uploadToBlob, deleteFromBlob } from '../utils/blobStorage.js';

// Helper to generate unique filename
const generateFilename = (userId, originalName, type) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const ext = originalName.split('.').pop();
    return `${type}_${userId}_${timestamp}_${random}.${ext}`;
};

// Create or Get Site Settings
export const getOrCreateSettings = async (req, res) => {
    try {
        let settings = await SiteSettings.findOne({ user_id: req.user.id });

        if (!settings) {
            settings = await SiteSettings.create({
                user_id: req.user.id
            });
        }

        res.status(200).json({
            status: 'success',
            data: { settings }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update Site Settings
export const updateSettings = async (req, res) => {
    try {
        const {
            site_title,
            site_description,
            theme_settings,
            seo_settings,
            analytics_settings,
            maintenance_mode
        } = req.body;

        let settings = await SiteSettings.findOne({ user_id: req.user.id });

        if (!settings) {
            return res.status(404).json({
                status: 'error',
                message: 'Settings not found. Please create settings first.'
            });
        }

        const updateData = {
            site_title,
            site_description,
            theme_settings: theme_settings ? JSON.parse(theme_settings) : settings.theme_settings,
            seo_settings: seo_settings ? JSON.parse(seo_settings) : settings.seo_settings,
            analytics_settings: analytics_settings ? JSON.parse(analytics_settings) : settings.analytics_settings,
            maintenance_mode: maintenance_mode !== undefined ? maintenance_mode : settings.maintenance_mode,
            updated_at: Date.now()
        };

        settings = await SiteSettings.findOneAndUpdate(
            { user_id: req.user.id },
            updateData,
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            data: { settings }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Upload Site Logo
export const uploadLogo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'Please upload a logo file'
            });
        }

        let settings = await SiteSettings.findOne({ user_id: req.user.id });

        if (!settings) {
            return res.status(404).json({
                status: 'error',
                message: 'Settings not found'
            });
        }

        // Delete old logo
        if (settings.site_logo_url) {
            await deleteFromBlob(settings.site_logo_url);
        }

        // Upload new logo
        const filename = generateFilename(req.user.id, req.file.originalname, 'logo');
        const result = await uploadToBlob(req.file.buffer, filename, 'site-assets');

        settings.site_logo_url = result.url;
        settings.updated_at = Date.now();
        await settings.save();

        res.status(200).json({
            status: 'success',
            message: 'Logo uploaded successfully',
            data: { settings }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Upload Favicon
export const uploadFavicon = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'Please upload a favicon file'
            });
        }

        let settings = await SiteSettings.findOne({ user_id: req.user.id });

        if (!settings) {
            return res.status(404).json({
                status: 'error',
                message: 'Settings not found'
            });
        }

        // Delete old favicon
        if (settings.favicon_url) {
            await deleteFromBlob(settings.favicon_url);
        }

        // Upload new favicon
        const filename = generateFilename(req.user.id, req.file.originalname, 'favicon');
        const result = await uploadToBlob(req.file.buffer, filename, 'site-assets');

        settings.favicon_url = result.url;
        settings.updated_at = Date.now();
        await settings.save();

        res.status(200).json({
            status: 'success',
            message: 'Favicon uploaded successfully',
            data: { settings }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Logo
export const deleteLogo = async (req, res) => {
    try {
        const settings = await SiteSettings.findOne({ user_id: req.user.id });

        if (!settings || !settings.site_logo_url) {
            return res.status(404).json({
                status: 'error',
                message: 'Logo not found'
            });
        }

        await deleteFromBlob(settings.site_logo_url);

        settings.site_logo_url = null;
        settings.updated_at = Date.now();
        await settings.save();

        res.status(200).json({
            status: 'success',
            message: 'Logo deleted successfully',
            data: { settings }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Favicon
export const deleteFavicon = async (req, res) => {
    try {
        const settings = await SiteSettings.findOne({ user_id: req.user.id });

        if (!settings || !settings.favicon_url) {
            return res.status(404).json({
                status: 'error',
                message: 'Favicon not found'
            });
        }

        await deleteFromBlob(settings.favicon_url);

        settings.favicon_url = null;
        settings.updated_at = Date.now();
        await settings.save();

        res.status(200).json({
            status: 'success',
            message: 'Favicon deleted successfully',
            data: { settings }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};