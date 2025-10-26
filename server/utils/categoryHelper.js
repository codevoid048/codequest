import { Category } from '../models/Category.js';

/**
 * Ensures categories exist in database, creates them if they don't
 * @param {string[]} categoryNames - Array of category names
 * @returns {Promise<void>}
 */
export const ensureCategoriesExist = async (categoryNames) => {
    if (!Array.isArray(categoryNames) || categoryNames.length === 0) {
        return;
    }

    try {
        // Get existing categories
        const existingCategories = await Category.find({ 
            name: { $in: categoryNames } 
        }).select('name').lean();
        
        const existingNames = existingCategories.map(cat => cat.name);
        
        // Find new categories to create
        const newCategories = categoryNames.filter(name => !existingNames.includes(name));
        
        // Create new categories if any
        if (newCategories.length > 0) {
            const categoryDocs = newCategories.map(name => ({ name }));
            await Category.insertMany(categoryDocs);
            console.log(`Created new categories: ${newCategories.join(', ')}`);
        }
    } catch (error) {
        console.error('Error ensuring categories exist:', error);
        // Don't throw error, just log it - we don't want to break challenge creation
    }
};