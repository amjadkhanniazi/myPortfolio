import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    image_url: {
        type: String,
        default: null
    },
    github_url: {
        type: String,
        default: null
    },
    live_url: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['In Progress', 'Completed', 'Archived'],
        default: 'In Progress'
    },
    display_order: {
        type: Number,
        default: 0
    },
    is_featured: {
        type: Boolean,
        default: false
    },
    is_visible: {
        type: Boolean,
        default: true
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

export default mongoose.model('Project', projectSchema);