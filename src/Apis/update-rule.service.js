import axios from 'axios';

const updateRule = async (ruleId, ruleData) => {
    try {
        const response = await axios.put(`http://localhost:6060/rules/${ruleId}`, ruleData);
        return response.data;
    } catch (error) {
        console.error('Error updating rule:', error);
        throw error;
    }
};

export { updateRule };