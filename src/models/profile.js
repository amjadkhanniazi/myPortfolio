import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    full_name: {
        type: String,
        required: true,
        minlength: 3
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    tagline: {
        type: String,
        required: true,
        minlength: 3
    },
    location: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        required: true,
        minlength: 3
    },
    profile_image_url: {
        type: String
    },
    cv_url: {
        type: String
    },
    social_links: [
        {
            type: String
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Profile',profileSchema);