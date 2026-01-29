import { put, del } from '@vercel/blob';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Upload file to Vercel Blob
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} filename - Desired filename
 * @param {string} folder - Folder path (e.g., 'profiles' or 'cvs')
 * @returns {Promise<{url: string}>}
 */
export const uploadToBlob = async (fileBuffer, filename, folder) => {
    try {
        const blob = await put(`${folder}/${filename}`, fileBuffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        
        return {
            url: blob.url,
            downloadUrl: blob.downloadUrl
        };
    } catch (error) {
        throw new Error(`Blob upload failed: ${error.message}`);
    }
};

/**
 * Delete file from Vercel Blob
 * @param {string} url - Blob URL to delete
 */
export const deleteFromBlob = async (url) => {
    try {
        if (!url) return;
        
        await del(url, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });
    } catch (error) {
        console.error('Blob deletion failed:', error.message);
        // Don't throw - deletion failures shouldn't break the app
    }
};
