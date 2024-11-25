const BASE_URL = 'http://localhost:6060/items';
import { callExternalApi } from "./external-api.service.js";

const fetchItemsByCategory = async (category) => {
    const config = {
        url: `http://localhost:6060/items?category=${category}`,
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

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
};

export {getItemsFromCategories};
