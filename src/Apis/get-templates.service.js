import axios from 'axios';

export async function fetchTemplates() {
    try {
        const response = await axios.get('http://localhost:6060/templates');
        return {
            data: response.data || [],
            error: null,
        };
    } catch (error) {

        console.error('Error fetching templates:', error);


        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching templates.';

        return {
            data: [],
            error: errorMessage,
        };
    }
}