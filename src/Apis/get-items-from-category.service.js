const BASE_URL = 'http://localhost:6060/items';
import {callExternalApi} from "./external-api.service.js";
const fetchItemsByCategory = async (getItemByCategoryRequest) => {
    const queryString = new URLSearchParams({
        category: getItemByCategoryRequest.category,
        page: getItemByCategoryRequest.page,
        itemPerPage: getItemByCategoryRequest.itemPerPage,
    }).toString();
console.log("test", queryString)
        const config = {
            url: `http://localhost:6060/items/category?${queryString}`,
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
}
        console.log("config", config)
        const { data, error } = await callExternalApi({ config });
        console.log("received", data)
        return {
            data: data || null,
            error,
        };
    }
    export { fetchItemsByCategory };

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
