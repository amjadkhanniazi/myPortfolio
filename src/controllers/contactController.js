import Contact from '../models/contact.js';

// Create Contact Message (Public - No Auth Required)
export const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Get IP address
        const ip_address = req.ip || req.connection.remoteAddress;

        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            ip_address,
            status: 'unread'
        });

        res.status(201).json({
            status: 'success',
            message: 'Message sent successfully',
            data: { contact }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get All Contact Messages (Protected)
export const getContacts = async (req, res) => {
    try {
        const { status } = req.query;
        
        const filter = {};
        if (status) filter.status = status;

        const contacts = await Contact.find(filter)
            .sort({ created_at: -1 });

        res.status(200).json({
            status: 'success',
            results: contacts.length,
            data: { contacts }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get Single Contact Message
export const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact message not found'
            });
        }

        // Mark as read if unread
        if (contact.status === 'unread') {
            contact.status = 'read';
            contact.read_at = Date.now();
            await contact.save();
        }

        res.status(200).json({
            status: 'success',
            data: { contact }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update Contact Status
export const updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact message not found'
            });
        }

        contact.status = status;
        if (status === 'read' && !contact.read_at) {
            contact.read_at = Date.now();
        }
        await contact.save();

        res.status(200).json({
            status: 'success',
            data: { contact }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete Contact Message
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact message not found'
            });
        }

        await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: 'Contact message deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get Contact Statistics
export const getContactStats = async (req, res) => {
    try {
        const total = await Contact.countDocuments();
        const unread = await Contact.countDocuments({ status: 'unread' });
        const read = await Contact.countDocuments({ status: 'read' });
        const replied = await Contact.countDocuments({ status: 'replied' });
        const archived = await Contact.countDocuments({ status: 'archived' });

        res.status(200).json({
            status: 'success',
            data: {
                stats: {
                    total,
                    unread,
                    read,
                    replied,
                    archived
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};