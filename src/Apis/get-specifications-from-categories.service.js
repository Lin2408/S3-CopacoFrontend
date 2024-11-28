import axios from 'axios';

const getSpecificationsFromCategory = async (categoryId) => {
    try {
        const response = await axios.get('http://localhost:6060/specifications/unique-names-by-category', {
            params: { category: categoryId },
        });
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching specifications by category:', error);
        throw error;
    }
};
const getSpecificationsValuesFromCategory = async (specName,categoryId) => {
    try {
        const response = await axios.get('http://localhost:6060/specifications', {
            params: { name: specName ,categoryId:categoryId},
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching specification values by category:', error);
        throw error;
    }
};

export {getSpecificationsFromCategory,getSpecificationsValuesFromCategory};