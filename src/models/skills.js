import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    category: {
        type: String,
        required: true,
        enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other']
    },
    proficiency: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    icon_url: {
        type: String,
        default: null
    },
    display_order: {
        type: Number,
        default: 0
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

export default mongoose.model('Skill', skillSchema);
