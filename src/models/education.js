import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    degree: {
        type: String,
        required: true,
        minlength: 3
    },
    institution: {
        type: String,
        required: true,
        minlength: 3
    },
    field_of_study: {
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
    highlights: {
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

export default mongoose.model('Education', educationSchema);