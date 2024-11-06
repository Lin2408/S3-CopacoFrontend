const BASE_URL = 'http://localhost:6060/items';

const fetchItemsByCategory = async (category) => {
    try {
        const response = await fetch(`${BASE_URL}?category=${category}}`);
        if (!response.ok) {
            throw new Error(`Error fetching ${category}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getItemsFromCategories = async () => {
    const categories = ['cpu', 'gpu', 'motherboard', 'ram'];
    const promises = categories.map(category => fetchItemsByCategory(category));
    const results = await Promise.all(promises);

    return {
        CPU: results[0],
        GPU: results[1],
        Motherboard: results[2],
        RAM: results[3],
    };
};

export { getItemsFromCategories };
