import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:6060',
});

const createRule = async (ruleData) => {
    try {
        const response = await axiosInstance.post('/rules', ruleData);
        return response.data;
    } catch (error) {
        console.error('Error creating rule:', error);
        throw error;
    }
};

export default createRule;