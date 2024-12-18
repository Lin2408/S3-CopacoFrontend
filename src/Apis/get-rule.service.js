import axios from 'axios';

const getRule = async (ruleId) => {
    try {
        const response = await axios.get(`http://localhost:6060/rules/${ruleId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching rule:', error);
        throw error;
    }
};

export { getRule };