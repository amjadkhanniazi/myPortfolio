import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    position: {
        type: String,
        required: true,
        minlength: 3
    },
    company: {
        type: String,
        required: true,
        minlength: 2
    },
    location: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        default: null
    },
    is_current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: null
    },
    responsibilities: {
        type: [String],
        default: []
    },
    technologies: {
        type: [String],
        default: []
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

export default mongoose.model('Experience', experienceSchema);