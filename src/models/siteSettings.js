import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    site_title: {
        type: String,
        default: 'My Portfolio'
    },
    site_description: {
        type: String,
        default: ''
    },
    site_logo_url: {
        type: String,
        default: null
    },
    favicon_url: {
        type: String,
        default: null
    },
    theme_settings: {
        type: Object,
        default: {
            primary_color: '#3B82F6',
            secondary_color: '#10B981',
            dark_mode: false
        }
    },
    seo_settings: {
        type: Object,
        default: {
            meta_keywords: [],
            meta_description: '',
            og_image: null
        }
    },
    analytics_settings: {
        type: Object,
        default: {
            google_analytics_id: null,
            facebook_pixel_id: null
        }
    },
    maintenance_mode: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('SiteSettings', siteSettingsSchema);