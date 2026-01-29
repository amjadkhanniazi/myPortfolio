import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    subject: {
        type: String,
        required: true,
        minlength: 3
    },
    message: {
        type: String,
        required: true,
        minlength: 10
    },
    status: {
        type: String,
        enum: ['unread', 'read', 'replied', 'archived'],
        default: 'unread'
    },
    ip_address: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    read_at: {
        type: Date,
        default: null
    }
});

export default mongoose.model('Contact', contactSchema);