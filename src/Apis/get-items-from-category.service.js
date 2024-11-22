const BASE_URL = 'http://localhost:6060/items';
import { callExternalApi } from "./external-api.service.js";

const fetchItemsByCategory = async (categoryId) => {
    const config = {
        url: `http://localhost:6060/categories?category=${categoryId}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const { data, error } = await callExternalApi({ config });
    console.log(data);

    return {
        data: data || null,
        error,
    };
};

export { fetchItemsByCategory };
