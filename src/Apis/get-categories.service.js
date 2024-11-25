import axios from 'axios';

export async function fetchCategories() {
    try {
        const response = await axios.get('http://localhost:6060/categories');
        return {
            data: response.data || [],
            error: null,
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return {
            data: [],
            error: error.message || 'An error occurred while fetching categories.',
        };
    }
}
