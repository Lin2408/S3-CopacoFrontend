import axios from 'axios';

export async function fetchSpecifications(itemId) {
    try {
        const response = await axios.get(`http://localhost:6060/specifications/item/${itemId}`);
        return {
            data: response.data || [],
            error: null,
        };
    } catch (error) {
        console.error('Error fetching specifications:', error);
        return {
            data: [],
            error: error.message || 'An error occurred while fetching specifications.',
        };
    }
}