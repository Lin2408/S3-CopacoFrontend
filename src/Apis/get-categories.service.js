import axios from 'axios';

export async function fetchCategories() {
    try {
        const response = await axios.get('http://localhost:8080/categories');
        return {
            data: response.data.Categories || [],
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
