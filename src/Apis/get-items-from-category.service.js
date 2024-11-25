const BASE_URL = 'http://localhost:6060/items';
import {callExternalApi} from "./external-api.service.js";

const fetchItemsByCategory = async (request) => {
    const queryString = new URLSearchParams({
        category: request.category,
        page: request.page,
        itemPerPage: request.itemPerPage,
        searchString: request.searchString,
    }).toString();

    const config = {
        url: `http://localhost:6060/items/category?${queryString}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    }
    const {data, error} = await callExternalApi({config});
    return {
        data: data || null,
        error,
    };
}
export {fetchItemsByCategory};

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

export {getItemsFromCategories};
