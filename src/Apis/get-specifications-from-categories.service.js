import axios from 'axios';

const getSpecificationsFromCategory = async (categoryId) => {
    try {
        const response = await axios.get('http://localhost:6060/specifications/unique-names-by-category', {
            params: { category: categoryId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching specifications by category:', error);
        throw error;
    }
};

export default getSpecificationsFromCategory;